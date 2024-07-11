const express = require("express");
const DishController = require("../controllers/dishController");
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");
const router = express.Router();

// Route to add a new dish
router.post(
  "/dishes",
  UserVerifyMiddleware.VerifyWaiter,
  DishController.addDish
);
// Route to update an existing dish
router.patch(
  "/dishes/:id",
  UserVerifyMiddleware.VerifyWaiter,
  DishController.updateDish
);
// Route to delete a dish
router.delete(
  "/dishes/:id",
  UserVerifyMiddleware.VerifyWaiter,
  DishController.deleteDish
);
// Route to get details of a specific dish
router.get("/dishes/:id", DishController.getDishByID);
// search function
router.post("/dishes/search/:searchQueries", DishController.SearchDishes);
router.get("/dishes/category/:id", DishController.getDishesByCategoryID);
// Route to get all dishes
router.get("/dishes", DishController.getAllDishes);

router.all("/dishes", methodNotAllowedHandler);

function methodNotAllowedHandler(req, res, next) {
  res.status(405).send("Method Not Allowed");
}

module.exports = router;
