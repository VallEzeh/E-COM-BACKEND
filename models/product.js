import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: 0,
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: 0,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    brand: {
      type: String,
      default: "Generic",
    },
    image: {
      url: String,
      filename: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
