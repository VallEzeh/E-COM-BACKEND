// routes/orderRoutes.js
import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrders,
  updateOrderStatus,
} from "../controller/orderController.js";
import authorize from "../middlewares/authorize.js";

const router = express.Router();

// Customer routes
router.post("/", authorize(["User"]), createOrder);
router.get("/myorders", authorize(["User"]), getMyOrders);

// Admin routes
router.get("/", authorize(["Admin"]), getOrders);
router.put("/:id/status", authorize(["Admin"]), updateOrderStatus);
router.get("/ping", (req, res) => {
  res.json({ message: "Orders API working" });
});

export default router;
