const express = require("express");
const OrderController = require("../controllers/orderController");
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");

const router = express.Router();

// Define routes and link them to controller methods

/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     summary: Create a new order
 *     description: Creates a new order with the given table ID and status. Requires a valid token and Waiter role.
 *     tags: [V1 Orders Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tableID
 *               - status
 *             properties:
 *               tableID:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: ["Pending", "Preparing", "Served", "Completed"]
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order created successfully"
 *                 orderId:
 *                   type: integer
 *                   example: 10
 *       400:
 *         description: Bad request - Missing or invalid input fields
 *         content:
 *           application/json:
 *             oneOf:
 *               - type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Input missing fields!"
 *               - type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Invalid Table Associated"
 *               - type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Invalid Status Entered"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
// Create a new order
router.post(
  "/orders",
  UserVerifyMiddleware.VerifyWaiter,
  OrderController.createOrder
);

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     description: Retrieves an order by its ID. Requires a valid token and Waiter role.
 *     tags: [V1 Orders Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the order to retrieve
 *     responses:
 *       200:
 *         description: Order retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order:
 *                   type: object
 *                   properties:
 *                     OrderID:
 *                       type: integer
 *                     UserID:
 *                       type: integer
 *                     TableID:
 *                       type: integer
 *                     OrderTime:
 *                       type: string
 *                       format: date-time
 *                     Status:
 *                       type: string
 *                     LocationID:
 *                       type: integer
 *       400:
 *         description: Bad request - Missing order ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "OrderID is required"
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
// Read an order by OrderID
router.get(
  "/orders/:id",
  UserVerifyMiddleware.VerifyWaiter,
  OrderController.readOrder
);

/**
 * @swagger
 * /api/v1/orders/{id}/status:
 *   patch:
 *     summary: Update order status
 *     description: Updates the status of an order. Requires a valid token and Waiter role.
 *     tags: [V1 Orders Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the order to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["Pending", "Preparing", "Served", "Completed"]
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order's status updated successfully"
 *       400:
 *         description: Bad request - Missing or invalid input fields
 *         content:
 *           application/json:
 *             oneOf:
 *               - type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Status and id are required"
 *               - type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Invalid Status Entered"
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order not found!"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

// Update order status
router.patch(
  "/orders/:id/status",
  UserVerifyMiddleware.VerifyWaiter,
  OrderController.updateOrderStatus
);

/**
 * @swagger
 * /api/v1/orders/timeframe:
 *   delete:
 *     summary: Delete orders within a timeframe
 *     description: Deletes orders within a specified timeframe. Requires a valid token and Waiter role.
 *     tags: [V1 Orders Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - startTime
 *               - endTime
 *             properties:
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Orders deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Orders deleted"
 *                 affectedRows:
 *                   type: integer
 *                   example: 6
 *       400:
 *         description: Bad request - Missing or invalid input fields
 *         content:
 *           application/json:
 *             oneOf:
 *               - type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Missing startTime or endTime"
 *               - type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Invalid startTime or endTime"
 *               - type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "startTime cannot be in the future"
 *               - type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "startTime cannot be greater than endTime"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
// Delete orders in timeframe
router.delete(
  "/orders/timeframe",
  UserVerifyMiddleware.VerifyWaiter,
  OrderController.deleteOrdersInTimeframe
);

/**
 * @swagger
 * /api/v1/orders/item/{id}:
 *   delete:
 *     summary: Delete an item from an order
 *     description: Deletes an item identified by the provided ID from an order. Requires a valid token and Waiter role.
 *     tags: [V1 Orders Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the order item to delete
 *     responses:
 *       200:
 *         description: Order item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order item deleted successfully"
 *       404:
 *         description: Order item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order item not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */

// Delete a single order item by OrderItemID
router.delete(
  "/orders/item/:id",
  UserVerifyMiddleware.VerifyWaiter,
  OrderController.deleteOrderItem
);

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   delete:
 *     summary: Delete an order
 *     description: Deletes an order identified by the provided ID. Requires a valid token and Waiter role.
 *     tags: [V1 Orders Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the order to delete
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order deleted successfully"
 *       404:
 *         description: Order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
// Delete a single order by OrderID
router.delete(
  "/orders/:id",
  UserVerifyMiddleware.VerifyWaiter,
  OrderController.deleteOrder
);

/**
 * @swagger
 * /api/v1/orders/location/{id}:
 *   get:
 *     summary: Get orders by location
 *     description: Retrieves all orders for a specified location ID. Requires a valid token and Waiter role.
 *     tags: [V1 Orders Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the location to retrieve orders for
 *     responses:
 *       200:
 *         description: Orders retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       OrderID:
 *                         type: integer
 *                       UserID:
 *                         type: integer
 *                       TableID:
 *                         type: integer
 *                       OrderTime:
 *                         type: string
 *                         format: date-time
 *                       Status:
 *                         type: string
 *                       LocationID:
 *                         type: integer
 *       400:
 *         description: Bad request - Missing location ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "id is required!"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

// Select an order in a location
router.get(
  "/orders/location/:id",
  UserVerifyMiddleware.VerifyWaiterAndChef,
  OrderController.selectOrdersByLocation
);

/**
 * @swagger
 * /api/v1/orders/items:
 *   post:
 *     summary: Add item to an order
 *     description: Adds an item to an order. Requires a valid token and Waiter role.
 *     tags: [V1 Orders Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderID
 *               - dishID
 *               - quantity
 *               - status
 *             properties:
 *               orderID:
 *                 type: integer
 *               dishID:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: ["ordered", "preparing", "cancelled", "delivered", "completed"]
 *               specialRequests:
 *                 type: string
 *     responses:
 *       201:
 *         description: Dish added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dish added successfully"
 *                 orderItemId:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Bad request - Missing or invalid input fields
 *         content:
 *           application/json:
 *             oneOf:
 *               - type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Missing input fields"
 *               - type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Invalid Status Entered"
 *               - type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Invalid order"
 *               - type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Invalid dish"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 */

// Add an item to an order
router.post(
  "/orders/items",
  UserVerifyMiddleware.VerifyWaiter,
  OrderController.addItem
);

/**
 * @swagger
 * /api/v1/orders/items/{id}/status/{status}:
 *   patch:
 *     summary: Update the status of an item in an order
 *     description: Updates the status of an item in an order. Requires a valid token and Waiter role.
 *     tags: [V1 Orders Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the order item to update
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: ["ordered", "preparing", "cancelled", "delivered", "completed"]
 *     responses:
 *       200:
 *         description: Order item status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request - Missing or invalid input fields
 *         content:
 *           application/json:
 *             oneOf:
 *               - type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Missing fields!"
 *               - type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Invalid Status Entered"
 *       404:
 *         description: Order item not found or no change in status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order item not found or no change in status"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
// Update item status (assuming only one result)
router.patch(
  "/orders/items/:id/status/:status",
  UserVerifyMiddleware.VerifyWaiterAndChef,
  OrderController.updateItemStatus
);

/**
 * @swagger
 * /api/v1/orders/with-table/location/{id}:
 *   get:
 *     summary: Get all order items in a location
 *     description: Retrieves all order items for a specified location ID, including table details. Requires a valid token and Waiter role.
 *     tags: [V1 Orders Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the location to retrieve order items for
 *     responses:
 *       200:
 *         description: Order items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   OrderItemID:
 *                     type: integer
 *                   OrderID:
 *                     type: integer
 *                   UserID:
 *                     type: integer
 *                   TableID:
 *                     type: integer
 *                   OrderTime:
 *                     type: string
 *                     format: date-time
 *                   OrderStatus:
 *                     type: string
 *                   LocationID:
 *                     type: integer
 *                   DishID:
 *                     type: integer
 *                   DishName:
 *                     type: string
 *                   Quantity:
 *                     type: integer
 *                   ItemStatus:
 *                     type: string
 *                   SpecialRequests:
 *                     type: string
 *                   TableCapacity:
 *                     type: integer
 *                   TableLocation:
 *                     type: string
 *       400:
 *         description: Bad request - Missing location ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "id is required!"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
// Show orders with table by status and location
router.get(
  "/orders/with-table/location/:id",
  UserVerifyMiddleware.VerifyWaiterAndChef,
  OrderController.showOrdersByLocation
);

// // Show items by status and location
// router.get(
//   "/orders/items/location/:id",
//   UserVerifyMiddleware.VerifyWaiterAndChef,
//   OrderController.showItemsByStatusLocation
// );

// // Show items by status, location, and table
// router.get(
//   "/orders/items/location/:id/table",
//   UserVerifyMiddleware.VerifyWaiter,
//   OrderController.showItemsByStatusAndLocationWithTable
// );

module.exports = router;
