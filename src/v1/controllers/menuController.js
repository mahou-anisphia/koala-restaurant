const Dish = require("../service/dishServices");
const Menu = require("../service/menuServices");
const Location = require("../service/locationServices");

class MenuController {
  // may not be used; as it may cause too much confusion for FE devs
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
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  // may not be used; as it may cause too much confusion for FE devs
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
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async GetDishesFromMenu(req, res) {
    try {
      const menuID = req.params.id;

      if (!menuID) {
        return res.status(400).json({ message: "Menu ID is required" });
      }

      const result = await Menu.GetFullMenu(menuID);

      if (!result) {
        return res
          .status(404)
          .json({ message: "Menu not found or menu with given ID is empty" });
      }

      return res.status(200).json(result);
    } catch (error) {
      console.error("Error while retrieving menu:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  // static async GetDishesFromMenuByLocation(req, res) {
  //   try {
  //     const locationId = req.params.id;

  //     if (!locationId) {
  //       return res.status(400).json({ message: "Location ID is required" });
  //     }
  //     const locationVerify = await Location.FindByID(locationId);
  //     if (!locationVerify) {
  //       return res.status(404).json({ message: "Location does not exist" });
  //     }

  //     const result = await Menu.GetFullMenusByLocation(locationId);
  //     if (!result || result.length === 0) {
  //       return res.status(404).json({
  //         message: "No menu available at this location",
  //         location: locationVerify,
  //       });
  //     }
  //     return res.status(200).json(result);
  //   } catch (error) {
  //     console.error("Error while retrieving menu by location ID:", error);
  //     return res.status(500).json({ message: "Internal Server Error" });
  //   }
  // }
  static async AddMenu(req, res) {
    const userID = req.user.UserID;
    try {
      const {
        name: Name,
        description: Description,
        locationID: LocationID,
      } = req.body;
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
        .json({ message: "Menu added successfully", menuID: menu });
    } catch (error) {
      console.error("Error in AddMenu:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateMenuDetails(req, res) {
    const { UserID: userID } = req.user;
    const { id: menuID } = req.params;
    const { name: Name, description: Description } = req.body;

    try {
      const menu = await Menu.GetAbstractMenu(menuID);
      if (!menuID) {
        return res.status(400).json({ message: "menuID is required" });
      }
      if (!menu) {
        return res.status(404).json({ message: "Menu not found" });
      }

      menu.Name = Name || menu.Name;
      menu.Description = Description || menu.Description;

      const updateResult = await Menu.UpdateMenuDetails(menu, userID);

      if (updateResult) {
        return res.status(200).json({
          message: "Menu updated successfully",
          result: updateResult,
        });
      } else {
        console.error("Error during interract with DB while update menu");
        return res.status(500).json({ message: "Internal server error" });
      }
    } catch (error) {
      console.error("Error in UpdateMenuDetails:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async AddDishToMenu(req, res) {
    const { id: menuID } = req.params;
    const { dishID } = req.body;

    try {
      if (!menuID) {
        return res.status(400).json({ message: "MenuID is required" });
      }

      const dish = await Dish.getDishByID(dishID);
      if (!dish) {
        return res
          .status(400)
          .json({ message: "Dish to be added does not exist" });
      }
      const validateMenu = await Menu.GetFullMenu(menuID);
      const menuToAdd = await Menu.GetAbstractMenu(menuID);
      if (!menuToAdd) {
        return res
          .status(404)
          .json({ message: "The menu with the given ID does not exist" });
      }

      if (validateMenu) {
        if (validateMenu.some((item) => item.DishID == dishID)) {
          return res
            .status(400)
            .json({ message: "Dish already exists in the given menu" });
        }
      }
      const validate = await Menu.AddDishToMenu(menuID, dishID);
      if (!validate) {
        console.error("Failed to add dish to menu in DB layer.");
        return res.status(500).json({ message: "Internal server error" });
      }

      return res
        .status(200)
        .json({ message: "Added dish to menu successfully" });
    } catch (error) {
      console.error("Error in AddDishToMenu:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async ModifyDishStatus(req, res) {
    const { dishID, menuID, status } = req.body;

    try {
      if (!dishID || !menuID || !status) {
        return res.status(400).json({ message: "Missing input field!" });
      }

      const validStatuses = ["Available", "Unavailable"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: "Invalid Status Entered" });
      }

      const validate = await Menu.ModifyDishStatusOnMenu(
        menuID,
        dishID,
        status
      );
      if (!validate) {
        console.error("Failed in DB while update dish status");
        return res.status(500).json({ message: "Internal server error" });
      }

      return res
        .status(200)
        .json({ message: "Dish status updated successfully" });
    } catch (error) {
      console.error("Error in ModifyDishStatus:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async DeleteDishFromMenu(req, res) {
    const { id: menuID } = req.params;
    const { dishID } = req.body;

    try {
      if (!menuID || !dishID) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const validate = await Menu.DeleteDishFromMenu(menuID, dishID);
      if (!validate) {
        console.error(
          "Error during interract with DB while delete dish from menu"
        );
        return res.status(500).json({ message: "Internal server error" });
      }

      return res
        .status(200)
        .json({ message: "Dish removed from menu successfully" });
    } catch (error) {
      console.error("Error in DeleteDishFromMenu:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  static async DeleteMenu(req, res) {
    const { id: menuID } = req.params;

    try {
      if (!menuID) {
        return res.status(400).json({ message: "MenuID is required" });
      }

      await Menu.ClearDishes(menuID);
      const validate = await Menu.DeleteMenu(menuID);
      if (!validate) {
        console.error(
          "error during interracting with DB, the data may not exist"
        );
        return res.status(500).json({ message: "Internal server error" });
      }

      return res.status(200).json({ message: "Menu deleted successfully" });
    } catch (error) {
      console.error("Error in DeleteMenu:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = MenuController;
