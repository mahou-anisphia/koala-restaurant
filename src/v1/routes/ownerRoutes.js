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
// router.patch(
//   "/update-user/:id",
//   UserVerifyMiddleware.VerifyOwner,
//   OwnerController.UpdateUser
// );
// router.delete(
//   "/delete-user/:id",
//   UserVerifyMiddleware.VerifyOwner,
//   OwnerController.DeleteUser
// );

router.all("/create-user", methodNotAllowedHandler);
router.all("/update-user", methodNotAllowedHandler);
router.all("/delete-user", methodNotAllowedHandler);

function methodNotAllowedHandler(req, res, next) {
  res.status(405).send("Method Not Allowed");
}

module.exports = router;
