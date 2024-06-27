const express = require("express");
const UserController = require("../controllers/userController");
const router = express.Router();

router.post("/login", UserController.Login);
router.post("/change-password", UserController.ChangePassword);

router.all("/login", methodNotAllowedHandler);
router.all("/change-password", methodNotAllowedHandler);

function methodNotAllowedHandler(req, res, next) {
  res.status(405).send("Method Not Allowed");
}

module.exports = router;
