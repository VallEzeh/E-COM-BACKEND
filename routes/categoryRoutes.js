// routes/categoryRoutes.js
import express from "express";
import { createCategory } from "../controller/categoryController.js";
import authorize from "../middlewares/authorize.js";

const router = express.Router();

// Only admins can create categories
router.post("/", authorize(["Admin"]), createCategory);

export default router;
