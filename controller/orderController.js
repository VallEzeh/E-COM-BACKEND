// controllers/orderController.js
import Order from "../models/order.js";

// @desc    Create new order
// @route   POST /order
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    // ✅ use lowercase "user" and req.user.id from JWT payload
    const order = new Order({
      user: req.user.id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const createdOrder = await order.save();
    res
      .status(201)
      .json({ message: "Order created successfully", order: createdOrder });
  } catch (error) {
    console.error("Error in createOrder:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user's orders
// @route   GET /order/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      "orderItems.product",
      "name price description image brand category"
    );

    res.json(orders);
  } catch (error) {
    console.error("Error in getMyOrders:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders (Admin only)
// @route   GET /order
// @access  Admin
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("orderItems.product", "name price");

    res.json(orders);
  } catch (error) {
    console.error("Error in getOrders:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status (Admin only)
// @route   PUT /order/:id/status
// @access  Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate("user", "name email").populate("orderItems.product", "name price");
    
    // if (req.body.paymentStatus) {
    //   order.paymentStatus = req.body.paymentStatus;
    // }

    res.json(updatedOrder);
  } catch (error) {
    console.error("Error in updateOrderStatus:", error.message);
    res.status(500).json({ message: error.message });
  }
};

