import { Timestamp } from "bson";
import mongoose from "mongoose";
import { boolean } from "webidl-conversions";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    title: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  review: { reviewSchema },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numberOFReview: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  productIsNew: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
