import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./db.js";
import Order from "./models/Order.js";
import Catalog from "./models/Catalog.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_, res) => res.json({ ok: true }));

app.get("/api/catalog", async (_, res) => {
  try {
    const catalog = await Catalog.findOne({ key: "main" }).lean();

    if (!catalog) {
      return res.status(404).json({
        message: "Catalog not found. Run `node seed.js` once to load it into the database."
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

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Pooja Arrangers backend running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  });
