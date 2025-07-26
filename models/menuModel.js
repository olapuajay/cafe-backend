import mongoose from "mongoose";

const menuSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ["coffee", "tea", "baked_items", "cold_brews", "savory_bites", "desserts", "healthy_picks"],
      required: true,
    },
    subcategory: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    imgUrl: { type: String, required: true },
    featured: { type: Boolean, default: false },
  }, { timestamps: true }
);

export default mongoose.model("Menu", menuSchema);