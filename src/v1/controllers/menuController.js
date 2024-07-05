const Dish = require("../service/dishServices");
const Menu = require("../service/dishServices");
const Location = require("../service/locationServices");

class MenuController {
  static async GetMenuByID(req, res) {
    try {
      const menuID = req.params.id;

      if (!menuID) {
        return res.status(400).json({ message: "Menu ID is required" });
      }

      const result = await Menu.GetAbstractMenu(menuID);

      if (!result) {
        return res.status(404).json({ message: "Menu not found" });
      }

      return res.status(200).json(result);
    } catch (error) {
      console.error("Error while retrieving menu:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async GetMenuByLocation(req, res) {
    try {
      const locationId = req.params.id;

      if (!locationId) {
        return res.status(400).json({ message: "Location ID is required" });
      }
      const locationVerify = await Location.FindByID(locationId);
      if (!locationVerify) {
        return res.status(404).json({ message: "Location does not exist" });
      }

      const result = await Menu.GetAbstractMenusByLocation(locationId);
      if (!result || result.length === 0) {
        return res.status(404).json({
          message: "No menu available at this location",
          location: locationVerify,
        });
      }
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error while retrieving menu by location ID:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async GetDetailedMenu(req, res) {
    try {
      const menuID = req.params.id;

      if (!menuID) {
        return res.status(400).json({ message: "Menu ID is required" });
      }

      const result = await Menu.GetFullMenu(menuID);

      if (!result) {
        return res.status(404).json({ message: "Menu not found" });
      }

      return res.status(200).json(result);
    } catch (error) {
      console.error("Error while retrieving menu:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async GetDetailedMenuByLocation(req, res) {
    try {
      const locationId = req.params.id;

      if (!locationId) {
        return res.status(400).json({ message: "Location ID is required" });
      }
      const locationVerify = await Location.FindByID(locationId);
      if (!locationVerify) {
        return res.status(404).json({ message: "Location does not exist" });
      }

      const result = await Menu.GetFullMenusByLocation(locationId);
      if (!result || result.length === 0) {
        return res.status(404).json({
          message: "No menu available at this location",
          location: locationVerify,
        });
      }
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error while retrieving menu by location ID:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async AddMenu(req, res) {
    const userID = req.user.UserID;
    try {
      const { Name, Description, LocationID } = req.body;
      if (!Name || !Description || !LocationID) {
        return res.status(400).json({ message: "Menu Missing Field!" });
      }
      const locationVerify = await Location.FindByID(LocationID);
      if (!locationVerify) {
        return res.status(404).json({ message: "Location does not exist" });
      }
      const menuData = {
        Name,
        Description,
        LocationID,
      };

      const menu = await Menu.AddMenu(menuData, userID);
      return res
        .status(201)
        .json({ message: "Menu added successfully", menuID: menu._id });
    } catch (error) {
      console.error("Error in AddMenu:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async UpdateMenuDetails(req, res) {}
  static async AddDishToMenu(req, res) {}
  static async ModifyDishStatus(req, res) {}
  static async DeleteDishFromMenu(req, res) {}
  static async DeleteMenu(req, res) {}
}

module.exports = MenuController;
