import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    status: { type: String, default: "New" },
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: String
    },
    event: {
      date: { type: String, required: true },
      venue: String,
      guests: String,
      notes: String
    },
    items: { type: Array, required: true },
    total: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
