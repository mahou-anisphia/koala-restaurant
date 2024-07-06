const pool = require("../../data-access/database");

class DiningTable {
  static async createDiningTable(capacity, location, locationID, userID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);
        connection.query(
          `INSERT INTO DiningTable (Capacity, Location, LocationID, CreatedBy) VALUES (?, ?, ?, ?)`,
          [capacity, location, locationID, userID],
          (error, result) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(result.insertId);
          }
        );
      });
    });
  }
  static async getDiningTableByID(tableID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);
        connection.query(
          `SELECT * FROM DiningTable WHERE TableID = ?`,
          tableID,
          (error, result) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(result[0]);
          }
        );
      });
    });
  }
  static async updateDiningTable(
    tableID,
    capacity,
    location,
    locationID,
    userID
  ) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);
        connection.query(
          `UPDATE DiningTable SET Capacity = ?, Location = ?, LocationID = ?, ModifiedBy = ? WHERE TableID = ?`,
          [capacity, location, locationID, userID, tableID],
          (error, result) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(result.affectedRows);
          }
        );
      });
    });
  }
  static async deleteDiningTable(tableID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);
        connection.query(
          `DELETE FROM DiningTable WHERE TableID = ?`,
          tableID,
          (error, result) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(result.affectedRows);
          }
        );
      });
    });
  }
  static async getDiningTableByLocationID(locationID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);
        connection.query(
          `SELECT * FROM DiningTable WHERE LocationID = ?`,
          locationID,
          (error, result) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        );
      });
    });
  }
}

module.exports = DiningTable;
