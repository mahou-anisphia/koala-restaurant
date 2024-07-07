const DiningTable = require("../service/diningTableServices");
const Order = require("../service/orderServices");

//add for waiter controller: where to serve the order?
// add: select by location AND status (maybe FE)
class OrderController {
  // Create a new order
  static async createOrder(req, res) {
    try {
      const { TableID, Status } = req.body;
      const UserID = req.user.UserID;
      if (!TableID || !Status) {
        return res.status(400).json({ message: "Input missing fields!" });
      }
      const table = await DiningTable.getDiningTableByID(TableID);
      if (!table) {
        return res.status(400).json({ message: "Invalid Table Associated" });
      }
      const validateStatus = ["Pending", "Preparing", "Served", "Completed"];
      if (!validateStatus.includes(Status)) {
        return res.status(400).json({ message: "Invalid Status Entered" });
      }
      const LocationID = table.LocationID;
      const orderData = { UserID, TableID, Status, LocationID };
      const orderId = await Order.createOrder(orderData);
      res.status(201).json({ success: true, orderId });
    } catch (error) {
      console.error("Error in createOrder: ", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Read an order by OrderID
  static async readOrder(req, res) {
    try {
      const { orderId } = req.params;
      const order = await Order.readOrder(orderId);
      if (order) {
        res.status(200).json({ success: true, order });
      } else {
        res.status(404).json({ success: false, message: "Order not found" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Update order status
  static async updateOrderStatus(req, res) {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const affectedRows = await Order.updateOrderStatus(orderId, status);
      if (affectedRows > 0) {
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({
          success: false,
          message: "Order not found or no change in status",
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Delete a single order by OrderID
  static async deleteOrder(req, res) {
    try {
      const { orderId } = req.params;
      const affectedRows = await Order.deleteOrder(orderId);
      if (affectedRows > 0) {
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ success: false, message: "Order not found" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Delete all orders in a timeframe
  static async deleteOrdersInTimeframe(req, res) {
    try {
      const { startTime, endTime } = req.body;
      const affectedRows = await Order.deleteOrdersInTimeframe(
        startTime,
        endTime
      );
      res.status(200).json({ success: true, affectedRows });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Select all orders in a location
  static async selectOrdersByLocation(req, res) {
    try {
      const { locationId } = req.params;
      const orders = await Order.selectOrdersByLocation(locationId);
      res.status(200).json({ success: true, orders });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Add an item to an order
  static async addItem(req, res) {
    try {
      const { OrderID, DishID, Quantity, Status, SpecialRequests } = req.body;
      const orderItemData = {
        OrderID,
        DishID,
        Quantity,
        Status,
        SpecialRequests,
      };
      const orderItemId = await Order.addItem(orderItemData);
      res.status(201).json({ success: true, orderItemId });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Update item status
  static async updateItemStatus(req, res) {
    try {
      const { orderItemId } = req.params;
      const { status } = req.body;
      const affectedRows = await Order.updateItemStatus(orderItemId, status);
      if (affectedRows > 0) {
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({
          success: false,
          message: "Order item not found or no change in status",
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // Show all items in a location
  static async showItemsByLocation(req, res) {
    try {
      const { locationId } = req.params;
      const items = await Order.showItemsByLocation(locationId);
      res.status(200).json({ success: true, items });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = OrderController;
