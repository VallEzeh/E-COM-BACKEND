import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import authorize from "../middlewares/authorize.js";


const router = express.Router();

// Customer routes
router.post("/", authorize, createOrder);
router.get("/myorders", authorize, getMyOrders);

// Admin routes
router.get("/", authorize(["Admin"]), getAllOrders);
router.put("/:id/status", authorize(["Admin"]), updateOrderStatus);

export default router;
