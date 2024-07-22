const Receipt = require("../service/receiptServices");
const Order = require("../service/orderServices");
class ReceiptController {
  // Create a new receipt
  static async createReceipt(req, res) {
    try {
      const {
        orderID: OrderID,
        amount: Amount,
        paymentMethod: PaymentMethod,
      } = req.body;
      if (!OrderID || !Amount || !PaymentMethod) {
        return res.status(400).json({ message: "Missing input fields" });
      }
      const validateOrder = await Order.readOrder(OrderID);
      if (!validateOrder) {
        return res.status(404).json({ message: "Order associated not found" });
      }
      // get ID from order
      const LocationID = validateOrder.LocationID;
      const PaymentTime = null;
      const receiptID = await Receipt.createReceipt({
        OrderID,
        Amount,
        PaymentMethod,
        PaymentTime,
        LocationID,
      });
      return res
        .status(201)
        .json({ message: "Receipt created successfully", receiptID });
    } catch (error) {
      console.error("error in createReceipt", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Get a receipt by ID
  static async getReceiptById(req, res) {
    try {
      const receiptID = req.params.id;
      if (!receiptID) {
        return res.status(400).json({ message: "id is required" });
      }
      const receipt = await Receipt.getReceiptById(receiptID);
      if (receipt) {
        return res.status(200).json(receipt);
      } else {
        return res.status(404).json({ message: "Receipt not found" });
      }
    } catch (error) {
      console.error("error in getReceiptById", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getReceiptByLocationId(req, res) {
    try {
      const locationID = req.params.id;
      if (!locationID) {
        return res.status(400).json({ message: "id is required" });
      }
      const receipts = await Receipt.getReceiptByLocationId(locationID);
      if (receipts) {
        return res.status(200).json(receipts);
      } else {
        console.error("null data received from DB");
        return res.status(500).json({ message: "Internal server error" });
      }
    } catch (error) {
      console.error("error in getReceiptById", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Update a receipt by ID
  // payment time means that the receipt is paid, if it is null, not paid.
  static async updateReceipt(req, res) {
    try {
      const receiptID = req.params.id;
      if (!receiptID) {
        return res.status(400).json({ message: "id is required" });
      }
      const receiptToUpdate = await Receipt.getReceiptById(receiptID);
      if (!receiptToUpdate) {
        return res.status(404).json({ message: "Receipt not found" });
      }
      const timestamp = Date.now();
      const receiptData = {
        OrderID: receiptToUpdate.OrderID,
        Amount: receiptToUpdate.amount,
        PaymentMethod: receiptToUpdate.PaymentMethod,
        PaymentTime: timestamp,
        LocationID: receiptToUpdate.LocationID,
      };
      const affectedRows = await Receipt.updateReceipt(receiptID, receiptData);
      if (affectedRows > 0) {
        return res
          .status(200)
          .json({ message: "Receipt updated successfully" });
      } else {
        return res.status(404).json({ message: "Receipt not found" });
      }
    } catch (error) {
      console.error("error in updateReceipt", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // Delete a receipt by ID
  static async deleteReceipt(req, res) {
    try {
      const receiptID = req.params.id;
      if (!receiptID) {
        return res.status(400).json({ message: "id is required" });
      }
      const affectedRows = await Receipt.deleteReceipt(receiptID);
      if (affectedRows > 0) {
        return res
          .status(200)
          .json({ message: "Receipt deleted successfully" });
      } else {
        return res.status(404).json({ message: "Receipt not found" });
      }
    } catch (error) {
      console.error("error in deleteReceipt", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // View all receipts
  static async viewAllReceipts(req, res) {
    try {
      const receipts = await Receipt.viewAllReceipts();
      return res.status(200).json(receipts);
    } catch (error) {
      console.error("error in viewAllReceipts", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // View receipts from time to time
  static async viewReceiptsFromTimeToTime(req, res) {
    try {
      const { startTime, endTime } = req.query;
      // Check if startTime or endTime is missing
      if (!startTime || !endTime) {
        return res
          .status(400)
          .json({ message: "Missing startTime or endTime" });
      }
      const start = new Date(startTime);
      const end = new Date(endTime);
      // Check if startTime or endTime are valid dates
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res
          .status(400)
          .json({ message: "Invalid startTime or endTime" });
      }
      const now = new Date();
      // Check if start time is in the future
      if (start > now) {
        return res
          .status(400)
          .json({ message: "startTime cannot be in the future" });
      }
      // Check if start time is greater than end time
      if (start > end) {
        return res
          .status(400)
          .json({ message: "startTime cannot be greater than endTime" });
      }

      const receipts = await Receipt.viewReceiptsFromTimeToTime(
        startTime,
        endTime
      );
      return res.status(200).json(receipts);
    } catch (error) {
      console.error("error in viewReceiptsFromTimeToTime", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = ReceiptController;
