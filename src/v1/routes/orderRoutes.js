const express = require("express");
const OrderController = require("../controllers/orderController");
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");

const router = express.Router();

// Define routes and link them to controller methods

// Create a new order
router.post(
  "/orders",
  UserVerifyMiddleware.VerifyWaiter,
  OrderController.createOrder
);

// Read an order by OrderID
router.get(
  "/orders/:id",
  UserVerifyMiddleware.VerifyWaiter,
  OrderController.readOrder
);

// Update order status
router.patch(
  "/orders/:id/status",
  UserVerifyMiddleware.VerifyWaiter,
  OrderController.updateOrderStatus
);

// Delete a single order by OrderID
router.delete(
  "/orders/:id",
  UserVerifyMiddleware.VerifyWaiter,
  OrderController.deleteOrder
);

// Delete all orders in a timeframe
router.delete(
  "/orders/timeframe",
  UserVerifyMiddleware.VerifyWaiter,
  OrderController.deleteOrdersInTimeframe
);

// Select an order in a location
router.get(
  "/orders/location/:id",
  UserVerifyMiddleware.VerifyWaiterAndChef,
  OrderController.selectOrdersByLocation
);

// Add an item to an order
router.post(
  "/orders/items",
  UserVerifyMiddleware.VerifyWaiter,
  OrderController.addItem
);

// Update item status (assuming only one result)
router.put(
  "/orders/items/:id/status/:status",
  UserVerifyMiddleware.VerifyWaiterAndChef,
  OrderController.updateItemStatus
);

// Show orders by status and location (assuming only one result)
router.get(
  "/orders/location/:id/status/:status",
  UserVerifyMiddleware.VerifyWaiterAndChef,
  OrderController.showOrdersByStatusAndLocation
);

// Show items by status and location (assuming only one result)
router.get(
  "/orders/items/location/:id/status/:status",
  UserVerifyMiddleware.VerifyWaiterAndChef,
  OrderController.showItemsByStatusLocation
);

// Show items by status, location, and table (assuming only one result)
router.get(
  "/orders/items/location/:id/status/:status/table",
  UserVerifyMiddleware.VerifyWaiter,
  OrderController.showItemsByStatusAndLocationWithTable
);

module.exports = router;
