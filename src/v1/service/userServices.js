const connection = require("../../data-access/database");

class User {
  static async findByUsername(username) {
    return this.queryDatabase(`SELECT * FROM User WHERE Login = ?`, [username]);
  }

  static async findById(id) {
    return this.queryDatabase(`SELECT * FROM User WHERE UserID = ?`, [id]);
  }

  static async findByLocationId(id) {
    return this.queryDatabase(`SELECT * FROM User WHERE LocationID = ?`, [id]);
  }

  static async changePassword(userId, password) {
    return this.queryDatabase(`UPDATE User SET Password = ? WHERE UserID = ?`, [password, userId]);
  }

  static async createUser(userDetails) {
    const { Name, Role, ContactDetails, Login, Password, LocationID } = userDetails;
    const query = `INSERT INTO User (Name, Role, ContactDetails, Login, Password, LocationID) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [Name, Role, ContactDetails, Login, Password, LocationID];
    return this.queryDatabase(query, values);
  }

  static async deleteUser(userId) {
    const query = `DELETE FROM User WHERE UserID = ?`;
    return this.queryDatabase(query, [userId]);
  }

  static async updateUser(userId, userDetails) {
    const { Name, Role, ContactDetails, Login, Password, LocationID } = userDetails;
    const query = `
      UPDATE User
      SET Name = ?, Role = ?, ContactDetails = ?, Login = ?, Password = ?, LocationID = ?
      WHERE UserID = ?
    `;
    const values = [Name, Role, ContactDetails, Login, Password, LocationID, userId];
    return this.queryDatabase(query, values);
  }

  static queryDatabase(query, values) {
    return new Promise((resolve, reject) => {
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
