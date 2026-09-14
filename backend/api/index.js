import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Order from "../models/Order.js";
import Catalog from "../models/Catalog.js";

const app = express();

app.use(cors());
app.use(express.json());

// Reuse the MongoDB connection across serverless invocations instead of
// opening a new one every time, which would exhaust connections quickly.
let isConnected = false;
async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) return;
  mongoose.set("strictQuery", true);
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
}

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("DB connection failed:", error.message);
    res.status(500).json({ message: "Database connection failed." });
  }
});

app.get("/api/health", (_, res) => res.json({ ok: true }));

app.get("/api/catalog", async (_, res) => {
  try {
    const catalog = await Catalog.findOne({ key: "main" }).lean();

    if (!catalog) {
      return res.status(404).json({
        message: "Catalog not found. Run `node seed.js` once locally to load it into the database."
      });
    }

    const { catering, djSound, lighting, decoration } = catalog;
    res.json({ catering, djSound, lighting, decoration });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not load catalog." });
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const { customer, event, items, total } = req.body;

    if (!customer?.name || !customer?.phone || !event?.date || !items?.length) {
      return res.status(400).json({ message: "Name, phone, event date and at least one service are required." });
    }

    const order = await Order.create({
      orderId: `PAC-${Date.now()}`,
      status: "New",
      customer,
      event,
      items,
      total
    });

    res.status(201).json({
      message: "Booking request received successfully.",
      order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not save booking." });
  }
});

app.get("/api/orders", async (_, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not read orders." });
  }
});

export default app;