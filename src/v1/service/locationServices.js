const connection = require("../../data-access/database");

class Location {
  static async FindByID(ID) {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM Location WHERE LocationID = ?`,
        [ID],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result[0]);
        }
      );
    });
  }
}

module.exports = Location;
