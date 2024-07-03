const express = require("express");
// const UserController = require("../controllers/userController");
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");
const OwnerController = require("../controllers/ownerController");

const router = express.Router();

router.post(
  "/create-user/",
  UserVerifyMiddleware.VerifyOwner,
  OwnerController.CreateUser
);
router.patch(
  "/update-user/:id",
  UserVerifyMiddleware.VerifyOwner,
  OwnerController.UpdateUser
);
router.delete(
  "/delete-user/:id",
  UserVerifyMiddleware.VerifyOwner,
  OwnerController.DeleteUser
);
router.get(
  "/view-user/location/:id",
  UserVerifyMiddleware.VerifyOwner,
  OwnerController.ViewEmployeeOnLocation
);
router.get(
  "/view-user/:id",
  UserVerifyMiddleware.VerifyOwner,
  OwnerController.ViewEmployeeAccount
);
router.get(
  "/view-user",
  UserVerifyMiddleware.VerifyOwner,
  OwnerController.ViewAllEmployee
);
router.patch(
  "/assign-role/:id",
  UserVerifyMiddleware.VerifyOwner,
  OwnerController.AssignUserRole
);

router.all("/create-user", methodNotAllowedHandler);
router.all("/update-user", methodNotAllowedHandler);
router.all("/delete-user", methodNotAllowedHandler);
router.all("/view-user", methodNotAllowedHandler);
router.all("/assign-role", methodNotAllowedHandler);
// router.all("/view-all", methodNotAllowedHandler);

function methodNotAllowedHandler(req, res, next) {
  res.status(405).send("Method Not Allowed");
}

module.exports = router;
