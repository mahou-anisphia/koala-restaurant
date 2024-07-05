const pool = require("../../data-access/database");

class Dish {
  // Method to add a new dish
  static async addDish(dishData) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);
        const {
          Name,
          Description,
          Price,
          PreparationTime,
          ImageLink,
          CreatedBy,
          ModifiedBy,
          CategoryID, // Add CategoryID
        } = dishData;
        const values = {
          Name,
          Description,
          Price,
          PreparationTime,
          ImageLink,
          CreatedBy,
          ModifiedBy,
          CategoryID, // Add CategoryID
        };

        connection.query(`INSERT INTO Dish SET ?`, values, (error, result) => {
          connection.release();
          if (error) {
            return reject(error);
          }
          resolve(result.insertId); // Return the ID of the newly inserted dish
        });
      });
    });
  }
  // Method to update an existing dish by ID
  static async updateDish(dishID, dishData) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);
        const {
          Name,
          Description,
          Price,
          PreparationTime,
          ImageLink,
          ModifiedBy,
          CategoryID, // Add CategoryID
        } = dishData;
        const values = {
          Name,
          Description,
          Price,
          PreparationTime,
          ImageLink,
          ModifiedBy,
          CategoryID, // Add CategoryID
        };

        connection.query(
          `UPDATE Dish SET ? WHERE DishID = ?`,
          [values, dishID],
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

  // Method to delete a dish by ID
  static async deleteDish(dishID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);
        connection.query(
          `DELETE FROM Dish WHERE DishID = ?`,
          dishID,
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

  // Method to get details of a specific dish by ID
  static async getDishByID(dishID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);
        connection.query(
          `SELECT * FROM DishWithCategory WHERE DishID = ?`,
          dishID,
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

  // Method to get all dishes
  static async getAllDishes() {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);
        connection.query(`SELECT * FROM DishWithCategory`, (error, results) => {
          connection.release();
          if (error) {
            return reject(error);
          }
          resolve(results);
        });
      });
    });
  }
  static async SearchDishes(searchTerm) {
    return new Promise((resolve, reject) => {
      const query = `
            SELECT *
            FROM DishWithCategory
            WHERE DishName LIKE ? OR Description LIKE ?
        `;
      const likeTerm = `%${searchTerm}%`;
      const values = [likeTerm, likeTerm];

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

  static async getDishesByCategoryID(categoryID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `SELECT * FROM DishWithCategory WHERE CategoryID = ?`,
          [categoryID],
          (error, results) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(results); // Return the list of dishes with the given category ID
          }
        );
      });
    });
  }
}

module.exports = Dish;
