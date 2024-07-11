const express = require("express");
const router = express.Router();
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");
const MenuController = require("../controllers/menuController");

// Route to get an abstract menu by ID
router.get("/menu/:id", MenuController.GetMenuByID);

// Route to get an abstract menu by location ID
router.get("/menu/location/:id", MenuController.GetMenuByLocation);

// Route to get a detailed menu by ID
router.get("/menu/dishes/:id", MenuController.GetDishesFromMenu);

// Route to get a detailed menu by location ID
router.get(
  "/menu/dishes/location/:id",
  MenuController.GetDishesFromMenuByLocation
);

// Route to add a new menu (requires user verification)
router.post("/menu", UserVerifyMiddleware.VerifyOwner, MenuController.AddMenu);

// Route to update menu details (requires user verification)
router.put(
  "/menu/:id",
  UserVerifyMiddleware.VerifyWaiter,
  MenuController.UpdateMenuDetails
);

// Route to add a dish to a menu (requires user verification)
router.post(
  "/menu/:id/dish",
  UserVerifyMiddleware.VerifyWaiter,
  MenuController.AddDishToMenu
);

// Route to modify the status of a dish on a menu (requires user verification)
router.put(
  "/menu/dish/status",
  UserVerifyMiddleware.VerifyWaiterAndChef,
  MenuController.ModifyDishStatus
);

// Route to delete a dish from a menu (requires user verification)
router.delete(
  "/menu/:id/dish",
  UserVerifyMiddleware.VerifyWaiter,
  MenuController.DeleteDishFromMenu
);

// Route to delete a menu (requires user verification)
router.delete(
  "/menu/:id",
  UserVerifyMiddleware.VerifyOwner,
  MenuController.DeleteMenu
);

router.all("/menu", methodNotAllowedHandler);
function methodNotAllowedHandler(req, res, next) {
  res.status(405).send("Method Not Allowed");
}
module.exports = router;
