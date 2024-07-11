const Receipt = require("../service/receiptServices"); // Adjust the path as needed

class ReceiptController {
  // Create a new receipt
  static async createReceipt(req, res) {
    try {
      const { OrderID, Amount, PaymentMethod, PaymentTime, LocationID } =
        req.body;
      const receiptID = await Receipt.createReceipt({
        OrderID,
        Amount,
        PaymentMethod,
        PaymentTime,
        LocationID,
      });
      res
        .status(201)
        .json({ message: "Receipt created successfully", receiptID });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating receipt", error: error.message });
    }
  }

  // Get a receipt by ID
  static async getReceiptById(req, res) {
    try {
      const receiptID = req.params.id;
      const receipt = await Receipt.getReceiptById(receiptID);
      if (receipt) {
        res.status(200).json(receipt);
      } else {
        res.status(404).json({ message: "Receipt not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching receipt", error: error.message });
    }
  }

  // Update a receipt by ID
  static async updateReceipt(req, res) {
    try {
      const receiptID = req.params.id;
      const { OrderID, Amount, PaymentMethod, PaymentTime, LocationID } =
        req.body;
      const receiptData = {
        OrderID,
        Amount,
        PaymentMethod,
        PaymentTime,
        LocationID,
      };
      const affectedRows = await Receipt.updateReceipt(receiptID, receiptData);
      if (affectedRows > 0) {
        res.status(200).json({ message: "Receipt updated successfully" });
      } else {
        res.status(404).json({ message: "Receipt not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating receipt", error: error.message });
    }
  }

  // Delete a receipt by ID
  static async deleteReceipt(req, res) {
    try {
      const receiptID = req.params.id;
      const affectedRows = await Receipt.deleteReceipt(receiptID);
      if (affectedRows > 0) {
        res.status(200).json({ message: "Receipt deleted successfully" });
      } else {
        res.status(404).json({ message: "Receipt not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting receipt", error: error.message });
    }
  }

  // View all receipts
  static async viewAllReceipts(req, res) {
    try {
      const receipts = await Receipt.viewAllReceipts();
      res.status(200).json(receipts);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching receipts", error: error.message });
    }
  }

  // View receipts from time to time
  static async viewReceiptsFromTimeToTime(req, res) {
    try {
      const { startTime, endTime } = req.query;
      const receipts = await Receipt.viewReceiptsFromTimeToTime(
        startTime,
        endTime
      );
      res.status(200).json(receipts);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching receipts", error: error.message });
    }
  }
}

module.exports = ReceiptController;
