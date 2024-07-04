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
}

module.exports = Location;
