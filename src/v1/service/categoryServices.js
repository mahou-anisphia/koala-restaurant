const pool = require("../../data-access/database");

class Category {
  static async createCategory(categoryData, userID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);
        const { Name, Description } = categoryData;
        const CreatedBy = userID;
        const values = { Name, Description, CreatedBy };

        connection.query(
          `INSERT INTO Category SET ?`,
          values,
          (error, result) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(result.insertId); // Return the ID of the newly inserted category
          }
        );
      });
    });
  }
  static async updateCategory(categoryID, categoryData, userID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);
        const { Name, Description } = categoryData;
        const values = { Name, Description };
        const ModifiedBy = userID;

        connection.query(
          `UPDATE Category SET ? WHERE CategoryID = ?`,
          [values, categoryID, ModifiedBy],
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
  static async deleteCategory(categoryID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `DELETE FROM Category WHERE CategoryID = ?`,
          [categoryID],
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
  static async getCategoryByID(categoryID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `SELECT * FROM Category WHERE CategoryID = ?`,
          [categoryID],
          (error, results) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(results[0]); // Return the category with the given ID
          }
        );
      });
    });
  }
  static async getAllCategories() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(`SELECT * FROM Category`, (error, results) => {
          connection.release();
          if (error) {
            return reject(error);
          }
          resolve(results); // Return all categories
        });
      });
    });
  }
}

module.exports = Category;
