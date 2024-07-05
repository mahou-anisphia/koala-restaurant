const pool = require("../../data-access/database");

class Menu {
  static async AddMenu(menuData, creatorID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        const { Name, Description, LocationID } = menuData;
        const values = {
          Name,
          Description,
          LocationID,
          CreatedBy: creatorID,
          ModifiedBy: creatorID, // Initial creation sets creator as modifier
        };

        connection.query(
          `INSERT INTO Menu SET ?`,
          [values],
          (error, result) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(result.insertId); // Resolve with the newly inserted MenuID
          }
        );
      });
    });
  }

  static async UpdateMenu(menuData, updaterID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        const { MenuID, Name, Description } = menuData;
        const values = {
          Name,
          Description,
          ModificationDate: new Date(),
          ModifiedBy: updaterID,
        };

        connection.query(
          `UPDATE Menu SET ? WHERE MenuID = ?`,
          [values, MenuID],
          (error, result) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(result.affectedRows > 0); // Resolve with true if updated
          }
        );
      });
    });
  }

  static async GetFullMenu(id) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `SELECT * FROM MenuDishDetails WHERE MenuID = ?`,
          [id],
          (error, results) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            if (results.length === 0) {
              resolve(null); // Menu not found
            } else {
              resolve(results[0]); // Resolve with the Menu object
            }
          }
        );
      });
    });
  }

  static async GetFullMenusByLocation(id) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `SELECT * FROM MenuDishDetails WHERE LocationID = ?`,
          [id],
          (error, results) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(results); // Resolve with array of Menu objects
          }
        );
      });
    });
  }

  static async AddDishToMenu(menuID, dishID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        const values = {
          MenuID: menuID,
          DishID: dishID,
          Status: "Available", // Default status when adding dish to menu
        };

        connection.query(
          `INSERT INTO MenuDish SET ?`,
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

  static async ModifyDishStatusOnMenu(menuID, dishID, status) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `UPDATE MenuDish SET Status = ? WHERE MenuID = ? AND DishID = ?`,
          [status, menuID, dishID],
          (error, result) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(result.affectedRows > 0); // Resolve with true if updated
          }
        );
      });
    });
  }

  static async DeleteMenu(menuID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `DELETE FROM Menu WHERE MenuID = ?`,
          [menuID],
          (error, result) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(result.affectedRows > 0); // Resolve with true if deleted
          }
        );
      });
    });
  }

  static async DeleteDishFromMenu(menuID, dishID) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `DELETE FROM MenuDish WHERE MenuID = ? AND DishID = ?`,
          [menuID, dishID],
          (error, result) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(result.affectedRows > 0); // Resolve with true if deleted
          }
        );
      });
    });
  }
  static async GetAbstractMenu(id) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `SELECT * FROM Menu WHERE MenuID = ?`,
          [id],
          (error, results) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            if (results.length === 0) {
              resolve(null); // Menu not found
            } else {
              resolve(results[0]); // Resolve with the Menu object
            }
          }
        );
      });
    });
  }

  static async GetAbstractMenusByLocation(id) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) return reject(err);

        connection.query(
          `SELECT * FROM Menu WHERE LocationID = ?`,
          [id],
          (error, results) => {
            connection.release();
            if (error) {
              return reject(error);
            }
            resolve(results); // Resolve with array of Menu objects
          }
        );
      });
    });
  }
}

module.exports = Menu;
