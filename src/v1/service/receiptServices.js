const pool = require("../../data-access/database");

class Receipt {
  // Create a new receipt
  static async createReceipt(receiptData) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);
        const { OrderID, Amount, PaymentMethod, PaymentTime, LocationID } =
          receiptData;
        const values = {
          OrderID,
          Amount,
          PaymentMethod,
          PaymentTime,
          LocationID,
        };

        connection.query(
          `INSERT INTO Receipt SET ?`,
          values,
          (error, result) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(result.insertId); // Return the ID of the newly inserted receipt
          }
        );
      });
    });
  }

  // Get a receipt by ID
  static async getReceiptById(receiptID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `SELECT * FROM Receipt WHERE ReceiptID = ?`,
          [receiptID],
          (error, results) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(results[0]); // Return the receipt data
          }
        );
      });
    });
  }

  static async getReceiptByLocationId(locationID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `SELECT * FROM Receipt WHERE LocationID = ?`,
          [locationID],
          (error, results) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(results); // Return the receipt data
          }
        );
      });
    });
  }

  // Update a receipt by ID
  static async updateReceipt(receiptID, receiptData) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `UPDATE Receipt SET ? WHERE ReceiptID = ?`,
          [receiptData, receiptID],
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

  // Delete a receipt by ID
  static async deleteReceipt(receiptID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `DELETE FROM Receipt WHERE ReceiptID = ?`,
          [receiptID],
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

  // View all receipts
  static async viewAllReceipts() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(`SELECT * FROM Receipt`, (error, results) => {
          connection.release();
          if (error) {
            return reject(error);
          }
          resolve(results); // Return all receipts
        });
      });
    });
  }

  // View receipts from time to time
  static async viewReceiptsFromTimeToTime(startTime, endTime) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `SELECT * FROM Receipt WHERE PaymentTime BETWEEN ? AND ?`,
          [startTime, endTime],
          (error, results) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(results); // Return receipts within the specified time range
          }
        );
      });
    });
  }
}

module.exports = Receipt;
