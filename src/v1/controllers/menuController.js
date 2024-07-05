const Dish = require("../service/dishServices");
const Menu = require("../service/dishServices");

class MenuController {
  static async GetMenuByID(req, res) {}
  static async GetMenuByLocation(req, res) {}
  static async GetDetailedMenu(req, res) {}
  static async GetDetailedMenuByLocation(req, res) {}
  static async AddMenu(req, res) {}
  static async UpdateMenu(req, res) {}
  static async AddDishToMenu(req, res) {}
  static async ModifyDishStatus(req, res) {}
  static async DeleteDishFromMenu(req, res) {}
  static async DeleteMenu(req, res) {}
}

module.exports = MenuController;
