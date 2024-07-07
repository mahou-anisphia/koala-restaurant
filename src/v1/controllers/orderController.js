const DiningTable = require("../service/diningTableServices");
const Order = require("../service/orderServices");
const Dish = require("../service/dishServices");

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
      res.status(201).json({ message: "Order created successfully", orderId });
    } catch (error) {
      console.error("Error in createOrder: ", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Read an order by OrderID
  static async readOrder(req, res) {
    try {
      const { id: orderId } = req.params;
      if (!orderId) {
        return res.status(400).json({ message: "OrderID is required" });
      }
      const order = await Order.readOrder(orderId);
      if (order) {
        res.status(200).json({ order });
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      console.error("Error in readOrder: ", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Update order status
  static async updateOrderStatus(req, res) {
    try {
      const { id: orderId } = req.params;
      const { status } = req.body;
      const validateStatus = ["Pending", "Preparing", "Served", "Completed"];
      if (!validateStatus.includes(Status)) {
        return res.status(400).json({ message: "Invalid Status Entered" });
      }
      const affectedRows = await Order.updateOrderStatus(orderId, status);
      if (affectedRows > 0) {
        res
          .status(200)
          .json({ message: "Order's status updated successfully" });
      } else {
        res.status(404).json({
          message: "Order not found or no change in status",
        });
      }
    } catch (error) {
      console.error("Error in updateOrderStatus: ", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Delete a single order by OrderID
  static async deleteOrder(req, res) {
    try {
      const { id: orderId } = req.params;
      const affectedRows = await Order.deleteOrder(orderId);
      if (affectedRows > 0) {
        res.status(200).json({ message: "Order deleted successfully" });
      } else {
        res.status(404).json({ message: "Order not found" });
      }
    } catch (error) {
      console.error("Error in deleteOrder: ", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Delete all orders in a timeframe
  static async deleteOrdersInTimeframe(req, res) {
    try {
      const { startTime, endTime } = req.body;

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

      const affectedRows = await Order.deleteOrdersInTimeframe(
        startTime,
        endTime
      );
      res.status(200).json({ message: "Orders deleted", affectedRows });
    } catch (error) {
      console.error("Error in deleteOrdersInTimeframe: ", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Select all orders in a location
  static async selectOrdersByLocation(req, res) {
    try {
      const { id: locationId } = req.params;
      if (!locationId) {
        // change parameter name accordingly to message
        return res.status(400).json({ message: "id is required!" });
      }
      const orders = await Order.selectOrdersByLocation(locationId);
      res.status(200).json({ orders });
    } catch (error) {
      console.error("Error in selectOrdersByLocation", error);
      res.status(500).json({ message: "Internal Server Error" });
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
      if (!OrderID || !DishID || !Quantity || !Status || !SpecialRequests) {
        return res.status(400).json({ message: "Missing input fields" });
      }
      const verifyOrder = await Order.readOrder(OrderID);
      if (!verifyOrder) {
        return res.status(400).json({ message: "Invalid order" });
      }
      const verifyDish = await Dish.getDishByID(DishID);
      if (!verifyDish) {
        return res.status(400).json({ message: "Invalid dish" });
      }
      const orderItemId = await Order.addItem(orderItemData);
      res.status(201).json({ message: "Dish added successfully", orderItemId });
    } catch (error) {
      console.error("Error in addItem", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Update item status
  static async updateItemStatus(req, res) {
    try {
      const { id: orderItemId } = req.params;
      const { status: status } = req.params;
      if (!orderItemId || !status) {
        return res.status(400).json({ message: "Missing fields!" });
      }
      const validateStatus = ["Pending", "Preparing", "Served", "Completed"];
      if (!validateStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid Status Entered" });
      }
      const affectedRows = await Order.updateItemStatus(orderItemId, status);
      if (affectedRows > 0) {
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({
          message: "Order item not found or no change in status",
        });
      }
    } catch (error) {
      console.error("Error in updateItemStatus", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Show all items in a location
  // for chief, serve one by one
  static async showItemsByLocation(req, res) {
    try {
      const { id: locationId } = req.params;
      if (!locationId) {
        return res.status(400).json({ message: "Missing fields!" });
      }
      const items = await Order.showItemsByLocation(locationId);
      res.status(200).json({ items });
    } catch (error) {
      console.error("Error in showItemsByLocation", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  // for waiter
  // show all for serving
  static async showItemsByStatusAndLocation(req, res) {
    try {
      const { id: locationId, status: status } = req.params;
      if (!locationId || !status) {
        return res.status(400).json({ message: "Missing fields!" });
      }
      const items = await Order.showItemsByStatusAndLocation(
        status,
        locationId
      );
      res.status(200).json({ success: true, items });
    } catch (error) {
      console.error("Error in showItemsByStatusAndLocation", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = OrderController;
