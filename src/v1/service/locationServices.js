const pool = require("../../data-access/database");

class Location {
  static async FindByID(ID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);
        connection.query(
          `SELECT * FROM Location WHERE LocationID = ?`,
          [ID],
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

  static async createLocation(locationData) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);
        const { Address, City, State, ZipCode, Country } = locationData;
        const values = {
          Address,
          City,
          State,
          ZipCode,
          Country,
        };

        connection.query(
          `INSERT INTO Location SET ?`,
          [values],
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

  static async updateLocation(locationID, locationData) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);
        const { Address, City, State, ZipCode, Country, ModificationDate } =
          locationData;
        const values = {
          Address,
          City,
          State,
          ZipCode,
          Country,
        };

        connection.query(
          `UPDATE Location SET ? WHERE LocationID = ?`,
          [values, locationID],
          (error, result) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(result.affectedRows > 0);
          }
        );
      });
    });
  }

  static async deleteLocation(locationID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `DELETE FROM Location WHERE LocationID = ?`,
          [locationID],
          (error, result) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(result.affectedRows > 0);
          }
        );
      });
    });
  }
}

module.exports = Location;
