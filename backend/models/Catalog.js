import mongoose from "mongoose";

// The whole catalog (catering, djSound, lighting, decoration) is stored
// as a single flexible document, since it's read far more often than
// it's written and the frontend consumes it as one blob.
const catalogSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "main" },
    catering: mongoose.Schema.Types.Mixed,
    djSound: mongoose.Schema.Types.Mixed,
    lighting: mongoose.Schema.Types.Mixed,
    decoration: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

export default mongoose.model("Catalog", catalogSchema);
