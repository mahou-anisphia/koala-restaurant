const express = require("express");
const CategoryController = require("../controllers/categoryController");
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");
const router = express.Router();

router.post(
  "/category",
  UserVerifyMiddleware.VerifyOwner,
  CategoryController.CreateCategory
);
router.put(
  "/category/:id",
  UserVerifyMiddleware.VerifyOwner,
  CategoryController.ModifyCategory
);
router.get("/category", CategoryController.ViewCategory);
router.get("/category/:id", CategoryController.ViewByID);
router.delete(
  "/category/:id",
  UserVerifyMiddleware.VerifyOwner,
  CategoryController.DeleteCategory
);

router.all("/categories", methodNotAllowedHandler);

function methodNotAllowedHandler(req, res, next) {
  res.status(405).send("Method Not Allowed");
}

module.exports = router;
