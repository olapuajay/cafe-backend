import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imgUrl: { type: String , required: true },
    category: { type: String, enum: ["coffee", "tea", "cold_brews", "baked_items", "savory_bites", "desserts", "healthy_picks"], required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);