import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
  }, { timestamps: true }
)

const productSchema = mongoose.Schema(
  {
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imgUrl: { type: String , required: true },
    category: { type: String, enum: ["packed_goods", "baked_items", "savory_bites", "desserts", "healthy_picks"], required: true },
    reviews: [reviewSchema],
    averageRating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);