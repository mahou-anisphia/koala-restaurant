const express = require("express");
const UserController = require("../controllers/userController");
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");
const router = express.Router();

router.post("/login", UserController.Login);
router.patch(
  "/change-password",
  UserVerifyMiddleware.VerifyUser,
  UserController.ChangePassword
);
router.get(
  "/view-profile",
  UserVerifyMiddleware.VerifyUser,
  UserController.ViewProfile
);

router.all("/login", methodNotAllowedHandler);
router.all("/change-password", methodNotAllowedHandler);

function methodNotAllowedHandler(req, res, next) {
  res.status(405).send("Method Not Allowed");
}

module.exports = router;
