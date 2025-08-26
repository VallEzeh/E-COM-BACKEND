import e from "express";
import {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} from "../controller/productController.js";
import authorize from "../middlewares/authorize.js";


import upload from "../middlewares/mutler.js"; // multer config

const router = e.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProduct);

// Admin protected routes (with image upload)
router.post("/", authorize(["Admin"]), upload.single("image"), createProduct);
router.put("/:id", authorize(["Admin"]), upload.single("image"), updateProduct);
router.delete("/:id", authorize(["Admin"]), deleteProduct);

export default router;
