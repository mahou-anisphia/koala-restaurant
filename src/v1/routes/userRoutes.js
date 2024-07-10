const express = require("express");
const UserController = require("../controllers/userController");
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");
const router = express.Router();

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: Login a user
 *     tags: [V1 User Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: Gus
 *               password:
 *                 type: string
 *                 example: LosPollos
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: JWT.user.token
 *       400:
 *         description: Missing input fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Missing input fields!
 *       404:
 *         description: Invalid username or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid username or password
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post("/user/login", UserController.Login);
router.patch(
  "/user/change-password",
  UserVerifyMiddleware.VerifyUser,
  UserController.ChangePassword
);

/**
 * @swagger
 * /api/v1/user/view-profile:
 *   get:
 *     summary: Retrieve the user's information
 *     tags: [V1 User Management]
 *     description: Retrieve the user's info from the DB
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345"
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "john.doe@example.com"
 */

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
