const pool = require("../../data-access/database");

class Reservation {
  static async CreateReservation(
    userID,
    tableID,
    reservationTime,
    specialRequests,
    status,
    locationID
  ) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        const values = {
          UserID: userID,
          TableID: tableID,
          ReservationTime: reservationTime,
          SpecialRequests: specialRequests,
          Status: status,
          LocationID: locationID,
        };

        connection.query(
          `INSERT INTO Reservation SET ?`,
          [values],
          (error, result) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(result.insertId); // Resolve with the newly inserted ID
          }
        );
      });
    });
  }
  static async GetReservationByID(reservationID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `SELECT * FROM Reservation WHERE ReservationID = ?`,
          [reservationID],
          (error, results) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(results[0]); // Resolve with the fetched reservation
          }
        );
      });
    });
  }
  static async GetReservationsByLocationID(locationID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `SELECT * FROM Reservation WHERE LocationID = ?`,
          [locationID],
          (error, results) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(results); // Resolve with the list of reservations
          }
        );
      });
    });
  }
  static async UpdateReservationStatus(reservationID, status) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `UPDATE Reservation SET Status = ? WHERE ReservationID = ?`,
          [status, reservationID],
          (error, result) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(result.affectedRows); // Resolve with the number of affected rows
          }
        );
      });
    });
  }
  static async DeleteReservation(reservationID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `DELETE FROM Reservation WHERE ReservationID = ?`,
          [reservationID],
          (error, result) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(result.affectedRows); // Resolve with the number of affected rows
          }
        );
      });
    });
  }
  static async GetReservationsByTableID(tableID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `SELECT * FROM Reservation WHERE TableID = ?`,
          [tableID],
          (error, results) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(results); // Resolve with the list of reservations
          }
        );
      });
    });
  }
  static async GetReservationsByStatusAndLocationID(status, locationID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `SELECT * FROM Reservation WHERE Status = ? AND LocationID = ?`,
          [status, locationID],
          (error, results) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(results); // Resolve with the list of reservations
          }
        );
      });
    });
  }
}

module.exports = Reservation;
