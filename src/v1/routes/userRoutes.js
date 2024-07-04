const express = require("express");
const UserController = require("../controllers/userController");
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");
const router = express.Router();

router.post("/user/login", UserController.Login);
router.patch(
  "/user/change-password",
  UserVerifyMiddleware.VerifyUser,
  UserController.ChangePassword
);
router.get(
  "/user/view-profile",
  UserVerifyMiddleware.VerifyUser,
  UserController.ViewProfile
);
router.patch(
  "/user/update",
  UserVerifyMiddleware.VerifyUser,
  UserController.UpdateUser
);

router.all("/user", methodNotAllowedHandler);
// router.all("/login", methodNotAllowedHandler);
// router.all("/change-password", methodNotAllowedHandler);
// router.all("/view-profile", methodNotAllowedHandler);

function methodNotAllowedHandler(req, res, next) {
  res.status(405).send("Method Not Allowed");
}

module.exports = router;
