const express = require("express");
// const UserController = require("../controllers/userController");
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");
const OwnerController = require("../controllers/ownerController");

const router = express.Router();

router.post(
  "/owner/create-user/",
  UserVerifyMiddleware.VerifyOwner,
  OwnerController.CreateUser
);
router.patch(
  "/owner/update-user/:id",
  UserVerifyMiddleware.VerifyOwner,
  OwnerController.UpdateUser
);
router.delete(
  "/owner/delete-user/:id",
  UserVerifyMiddleware.VerifyOwner,
  OwnerController.DeleteUser
);
router.get(
  "/owner/view-user/location/:id",
  UserVerifyMiddleware.VerifyOwner,
  OwnerController.ViewEmployeeOnLocation
);
router.get(
  "/owner/view-user/:id",
  UserVerifyMiddleware.VerifyOwner,
  OwnerController.ViewEmployeeAccount
);
router.get(
  "/owner/view-user",
  UserVerifyMiddleware.VerifyOwner,
  OwnerController.ViewAllEmployee
);
router.patch(
  "/owner/assign-role/:id",
  UserVerifyMiddleware.VerifyOwner,
  OwnerController.AssignUserRole
);
router.get(
  "/owner/search/:searchQueries",
  UserVerifyMiddleware.VerifyOwner,
  OwnerController.SearchUser
);

router.all("/owner", methodNotAllowedHandler);
// router.all("/update-user", methodNotAllowedHandler);
// router.all("/delete-user", methodNotAllowedHandler);
// router.all("/view-user", methodNotAllowedHandler);
// router.all("/assign-role", methodNotAllowedHandler);
// router.all("/search", methodNotAllowedHandler);
// router.all("/view-all", methodNotAllowedHandler);

function methodNotAllowedHandler(req, res, next) {
  res.status(405).send("Method Not Allowed");
}

module.exports = router;
