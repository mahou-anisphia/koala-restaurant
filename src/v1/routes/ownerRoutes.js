const express = require("express");
// const UserController = require("../controllers/userController");
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");

const router = express.Router();

router.post("/create-user", UserVerifyMiddleware.VerifyOwner);
router.patch("/update-user", UserVerifyMiddleware.VerifyOwner);
router.delete("/delete-user", UserVerifyMiddleware.VerifyOwner);

router.all("/create-user", methodNotAllowedHandler);
router.all("/update-user", methodNotAllowedHandler);
router.all("/delete-user", methodNotAllowedHandler);

function methodNotAllowedHandler(req, res, next) {
  res.status(405).send("Method Not Allowed");
}

module.exports = router;
