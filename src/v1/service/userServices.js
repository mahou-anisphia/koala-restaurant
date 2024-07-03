const connection = require("../../data-access/database");

class User {
  static async FindByUsername(username) {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM User WHERE Login = ?`,
        [username],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result[0]);
        }
      );
    });
  }
  static async FindByID(ID) {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM User WHERE UserID = ?`,
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
  static async FindByLocationID(ID) {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM User WHERE LocationID = ?`,
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
  static async ChangePassword(UserID, Passowrd) {
    return new Promise((resolve, reject) => {
      connection.query(
        `UPDATE User SET Password = ? WHERE UserID = ?`,
        [Passowrd, UserID],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      );
    });
  }
  static async CreateUser(userDetails) {
    return new Promise((resolve, reject) => {
      const { Name, Role, ContactDetails, Login, Password, LocationID } =
        userDetails;
      const query = `INSERT INTO User (Name, Role, ContactDetails, Login, Password, LocationID) VALUES (?, ?, ?, ?, ?, ?)`;
      const values = [Name, Role, ContactDetails, Login, Password, LocationID];

      connection.query(query, values, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });
  }
  static async DeleteUser(UserID) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM User WHERE UserID = ?`;

      connection.query(query, [UserID], (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });
  }
  static async UpdateUser(userId, userDetails) {
    return new Promise((resolve, reject) => {
      const { Name, Role, ContactDetails, Login, Password, LocationID } =
        userDetails;
      const query = `
        UPDATE User
        SET Name = ?, Role = ?, ContactDetails = ?, Login = ?, Password = ?, LocationID = ?
        WHERE UserID = ?
      `;
      const values = [
        Name,
        Role,
        ContactDetails,
        Login,
        Password,
        LocationID,
        userId,
      ];

      connection.query(query, values, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });
  }
}

module.exports = User;
