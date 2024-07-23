const pool = require("../../data-access/database");

class Order {
  // Create a new order
  static async createOrder(orderData) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);
        const { UserID, TableID, Status, LocationID } = orderData;
        const values = { UserID, TableID, Status, LocationID };

        connection.query(
          `INSERT INTO MealOrder SET ?`,
          values,
          (error, result) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(result.insertId); // Return the ID of the newly inserted order
          }
        );
      });
    });
  }

  // Read an order by OrderID
  static async readOrder(orderID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `SELECT * FROM MealOrder WHERE OrderID = ?`,
          [orderID],
          (error, results) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(results[0]); // Return the order details
          }
        );
      });
    });
  }

  // Update order status
  static async updateOrderStatus(orderID, status) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `UPDATE MealOrder SET Status = ? WHERE OrderID = ?`,
          [status, orderID],
          (error, result) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(result.affectedRows); // Return the number of affected rows
          }
        );
      });
    });
  }

  // Delete a single order by OrderID
  static async deleteOrder(orderID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `DELETE FROM MealOrder WHERE OrderID = ?`,
          [orderID],
          (error, result) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(result.affectedRows); // Return the number of affected rows
          }
        );
      });
    });
  }

  // Delete a single orderItem
  static async deleteOrderItem(orderItemID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `DELETE FROM OrderItem WHERE OrderItemID = ?`,
          [orderItemID],
          (error, result) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(result.affectedRows); // Return the number of affected rows
          }
        );
      });
    });
  }

  // Delete all orders in a timeframe
  static async deleteOrdersInTimeframe(startTime, endTime) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `DELETE FROM MealOrder WHERE OrderTime BETWEEN ? AND ?`,
          [startTime, endTime],
          (error, result) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(result.affectedRows); // Return the number of affected rows
          }
        );
      });
    });
  }

  // Select all orders in a location
  static async selectOrdersByLocation(locationID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `SELECT * FROM MealOrder WHERE LocationID = ?`,
          [locationID],
          (error, results) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(results); // Return the list of orders in the location
          }
        );
      });
    });
  }
  // Add an item to an order
  static async addItem(orderItemData) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);
        const { OrderID, DishID, Quantity, Status, SpecialRequests } =
          orderItemData;
        const values = { OrderID, DishID, Quantity, Status, SpecialRequests };

        connection.query(
          `INSERT INTO OrderItem SET ?`,
          values,
          (error, result) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(result.insertId); // Return the ID of the newly inserted order item
          }
        );
      });
    });
  }

  // Update item status
  static async updateItemStatus(orderItemID, status) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `UPDATE OrderItem SET Status = ? WHERE OrderItemID = ?`,
          [status, orderItemID],
          (error, result) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(result.affectedRows); // Return the number of affected rows
          }
        );
      });
    });
  }

  // Show all items in a location
  static async showItemsByLocationAndStatus(status, locationID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        const query = `
        SELECT *
        FROM OrderItemDetails
        WHERE ItemStatus = ? AND LocationID = ?
      `;

        connection.query(query, [status, locationID], (error, results) => {
          connection.release();
          if (error) {
            return reject(error);
          }
          resolve(results); // Return the list of order items with dining table info
        });
      });
    });
  }
  // Fetch all items by status and LocationID using the view
  static async showItemsByStatusAndLocationWithTable(status, locationID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        const query = `
        SELECT *
        FROM OrderItemWithTableDetails
        WHERE ItemStatus = ? AND LocationID = ?
      `;

        connection.query(query, [status, locationID], (error, results) => {
          connection.release();
          if (error) {
            return reject(error);
          }
          resolve(results); // Return the list of order items with dining table info
        });
      });
    });
  }
  // to be added
  static async showOrdersByLocation(locationID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        const query = `
        SELECT *
        FROM OrderItemWithTableDetails
        WHERE LocationID = ?
      `;

        connection.query(query, [locationID], (error, results) => {
          connection.release();
          if (error) {
            return reject(error);
          }
          resolve(results); // Return the list of order items with dining table info
        });
      });
    });
  }
  // static async showItemsByStatusAndOrderID(status, orderID) {
  //   return new Promise((resolve, reject) => {
  //     pool.getConnection((err, connection) => {
  //       if (err) return reject(err);

  //       const query = `
  //       SELECT *
  //       FROM OrderItemWithTableDetails
  //       WHERE ItemStatus = ? AND OrderID = ?
  //     `;

  //       connection.query(query, [status, orderID], (error, results) => {
  //         connection.release();
  //         if (error) {
  //           return reject(error);
  //         }
  //         resolve(results); // Return the list of order items with dining table info
  //       });
  //     });
  //   });
  // }
}

module.exports = Order;
