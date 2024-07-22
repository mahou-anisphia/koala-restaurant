const express = require("express");
const ReceiptController = require("../controllers/receiptController"); // Ensure the path is correct
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");
const router = express.Router();

// All routes in receipt use UserVerifyMiddeware.VerifyWaiter
router.use(UserVerifyMiddleware.VerifyWaiter);

// Create a new receipt
router.post("/receipts", ReceiptController.createReceipt);

// Get a receipt by ID
router.get("/receipts/:id", ReceiptController.getReceiptById);

// Update a receipt by ID
router.put("/receipts/:id", ReceiptController.updateReceipt);

// Delete a receipt by ID
router.delete("/receipts/:id", ReceiptController.deleteReceipt);

// View all receipts
router.get("/receipts", ReceiptController.viewAllReceipts);

// View receipt for a location
router.get("/receipts/location/:id", ReceiptController.getReceiptByLocationId);

// View receipts from time to time
router.get(
  "/receipts/time-range",
  ReceiptController.viewReceiptsFromTimeToTime
);

module.exports = router;
