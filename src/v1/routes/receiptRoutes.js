const express = require("express");
const ReceiptController = require("../controllers/receiptController"); // Ensure the path is correct
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");
const router = express.Router();

// All routes in receipt use UserVerifyMiddeware.VerifyWaiter
router.use(UserVerifyMiddleware.VerifyWaiter);

// View receipts from time to time (NOT DOCUMENTED)
router.get(
  "/receipts/time-range",
  ReceiptController.viewReceiptsFromTimeToTime
);

/**
 * @swagger
 * /api/v1/receipts:
 *   post:
 *     summary: Create a receipt
 *     description: Creates a receipt for an order. Requires the Waiter role and a valid token.
 *     tags: [V1 Receipt Routes Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderID:
 *                 type: integer
 *               amount:
 *                 type: number
 *               paymentMethod:
 *                 type: string
 *             example:
 *               orderID: 2
 *               amount: 1
 *               paymentMethod: "Card"
 *     responses:
 *       201:
 *         description: Receipt created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 receiptID:
 *                   type: integer
 *               example:
 *                 message: "Receipt created successfully"
 *                 receiptID: 3
 *       400:
 *         description: Missing input fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Missing input fields"
 *       404:
 *         description: Order associated not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Order associated not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Internal server error"
 */

// Create a new receipt
router.post("/receipts", ReceiptController.createReceipt);

/**
 * @swagger
 * /api/v1/receipts/{id}:
 *   get:
 *     summary: View a receipt by ID
 *     description: Retrieves the details of a receipt by its ID. Requires the Waiter role and a valid token.
 *     tags: [V1 Receipt Routes Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the receipt to retrieve
 *     responses:
 *       200:
 *         description: Receipt details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ReceiptID:
 *                   type: integer
 *                 OrderID:
 *                   type: integer
 *                 Amount:
 *                   type: number
 *                 PaymentMethod:
 *                   type: string
 *                 PaymentTime:
 *                   type: string
 *                   format: date-time
 *                 LocationID:
 *                   type: integer
 *               example:
 *                 ReceiptID: 1
 *                 OrderID: 3
 *                 Amount: 0
 *                 PaymentMethod: "Card"
 *                 PaymentTime: "2024-07-22T08:33:53.000Z"
 *                 LocationID: 1
 *       400:
 *         description: ID is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "id is required"
 *       404:
 *         description: Receipt not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Receipt not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Internal server error"
 */

// Get a receipt by ID
router.get("/receipts/:id", ReceiptController.getReceiptById);

/**
 * @swagger
 * /api/v1/receipts/{id}:
 *   patch:
 *     summary: Edit a receipt
 *     description: Updates the payment time of a receipt by its ID. Requires the Waiter role and a valid token.
 *     tags: [V1 Receipt Routes Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the receipt to edit
 *     responses:
 *       200:
 *         description: Receipt updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Receipt updated successfully"
 *       400:
 *         description: ID is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "id is required"
 *       404:
 *         description: Receipt not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Receipt not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Internal server error"
 */

// Update a receipt by ID
router.patch("/receipts/:id", ReceiptController.updateReceipt);

/**
 * @swagger
 * /api/v1/receipts/{id}:
 *   delete:
 *     summary: Delete a receipt
 *     description: Deletes a receipt by its ID. Requires the Waiter role and a valid token.
 *     tags: [V1 Receipt Routes Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the receipt to delete
 *     responses:
 *       200:
 *         description: Receipt deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Receipt deleted successfully"
 *       400:
 *         description: ID is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "id is required"
 *       404:
 *         description: Receipt not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Receipt not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Internal server error"
 */

// Delete a receipt by ID
router.delete("/receipts/:id", ReceiptController.deleteReceipt);

/**
 * @swagger
 * /api/v1/receipts:
 *   get:
 *     summary: Get all receipts
 *     description: Retrieves a list of all receipts. Requires the Waiter role and a valid token.
 *     tags: [V1 Receipt Routes Management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Receipts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ReceiptID:
 *                     type: integer
 *                   OrderID:
 *                     type: integer
 *                   Amount:
 *                     type: number
 *                   PaymentMethod:
 *                     type: string
 *                   PaymentTime:
 *                     type: string
 *                     format: date-time
 *                   LocationID:
 *                     type: integer
 *                 example:
 *                   ReceiptID: 2
 *                   OrderID: 4
 *                   Amount: 0
 *                   PaymentMethod: "Card"
 *                   PaymentTime: "2024-07-22T08:42:46.000Z"
 *                   LocationID: 1
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Internal server error"
 */

// View all receipts
router.get("/receipts", ReceiptController.viewAllReceipts);

/**
 * @swagger
 * /api/v1/receipts/location/{id}:
 *   get:
 *     summary: View receipts by location ID
 *     description: Retrieves a list of receipts by location ID. Requires the Waiter role and a valid token.
 *     tags: [V1 Receipt Routes Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the location to retrieve receipts for
 *     responses:
 *       200:
 *         description: Receipts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ReceiptID:
 *                     type: integer
 *                   OrderID:
 *                     type: integer
 *                   Amount:
 *                     type: number
 *                   PaymentMethod:
 *                     type: string
 *                   PaymentTime:
 *                     type: string
 *                     format: date-time
 *                   LocationID:
 *                     type: integer
 *                 example:
 *                   ReceiptID: 2
 *                   OrderID: 4
 *                   Amount: 1
 *                   PaymentMethod: "Card"
 *                   PaymentTime: null
 *                   LocationID: 1
 *       400:
 *         description: ID is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "id is required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Internal server error"
 */
// View receipt for a location
router.get("/receipts/location/:id", ReceiptController.getReceiptByLocationId);

module.exports = router;
