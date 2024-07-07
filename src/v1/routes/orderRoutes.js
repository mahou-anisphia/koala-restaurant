const express = require("express");
const OrderController = require("../controllers/orderController");
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");

const router = express.Router();

// Apply the UserVerifyMiddleware to all routes
router.use(UserVerifyMiddleware);

// Define routes and link them to controller methods

// Create a new order
router.post("/orders", OrderController.createOrder);

// Read an order by OrderID
router.get("/orders/:id", OrderController.readOrder);

// Update order status
router.put("/orders/:id/status", OrderController.updateOrderStatus);

// Delete a single order by OrderID
router.delete("/orders/:id", OrderController.deleteOrder);

// Delete all orders in a timeframe (assuming only one result)
router.delete("/orders/timeframe", OrderController.deleteOrdersInTimeframe);

// Select an order in a location (assuming only one result)
router.get("/orders/location/:id", OrderController.selectOrderByLocation);

// Add an item to an order
router.post("/orders/items", OrderController.addItem);

// Update item status (assuming only one result)
router.put(
  "/orders/items/:id/status/:status",
  OrderController.updateItemStatus
);

// Show orders by status and location (assuming only one result)
router.get(
  "/orders/location/:id/status/:status",
  OrderController.showOrderByStatusAndLocation
);

// Show items by status and location (assuming only one result)
router.get(
  "/orders/items/location/:id/status/:status",
  OrderController.showItemsByStatusLocation
);

// Show items by status, location, and table (assuming only one result)
router.get(
  "/orders/items/location/:id/status/:status/table",
  OrderController.showItemsByStatusAndLocationWithTable
);

module.exports = router;
