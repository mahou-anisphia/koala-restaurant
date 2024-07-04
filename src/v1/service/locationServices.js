const pool = require("../../data-access/database");

class Location {
  static async SelectAllLocation() {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM Location`;

      pool.getConnection((err, connection) => {
        if (err) return reject(err);
        connection.query(query, (error, result) => {
          connection.release();
          if (error) {
            return reject(error);
          }
          resolve(result);
        });
      });
    });
  }
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

  static async CreateLocation(locationData) {
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

  static async UpdateLocation(locationID, locationData) {
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

  static async DeleteLocation(locationID) {
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
  static async SearchLocations(searchTerm) {
    return new Promise((resolve, reject) => {
      const query = `
            SELECT Address, City, State, ZipCode, Country
            FROM Location
            WHERE Address LIKE ? OR City LIKE ? OR State LIKE ? OR ZipCode LIKE ? OR Country LIKE ?
        `;
      const likeTerm = `%${searchTerm}%`;
      const values = [likeTerm, likeTerm, likeTerm, likeTerm, likeTerm];

      pool.getConnection((err, connection) => {
        if (err) return reject(err);
        connection.query(query, values, (error, results) => {
          connection.release();
          if (error) {
            return reject(error);
          }
          resolve(results);
        });
      });
    });
  }
}

module.exports = Location;
