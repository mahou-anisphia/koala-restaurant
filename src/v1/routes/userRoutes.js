const express = require("express");
const UserController = require("../controllers/userController");
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");
const router = express.Router();

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: Login a user
 *     description: Allows a user to login, return a token.
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

/**
 * @swagger
 * /api/v1/user/change-password:
 *   patch:
 *     summary: Change the user's password
 *     description: Allows a user to change their password. Requires a valid authorization token.
 *     tags: [V1 User Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: The new password for the user
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password updated successfully
 *       400:
 *         description: Missing input fields - User did not enter new password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Missing input fields!
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     NoToken:
 *                       value: Unauthorized
 *                     InvalidToken:
 *                       value: Unauthorized
 *       404:
 *         description: User does not exist - Invalid user (Fake token or deleted user)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User does not exist
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

router.patch(
  "/user/change-password",
  UserVerifyMiddleware.VerifyUser,
  UserController.ChangePassword
);
/**
 * @swagger
 * /api/v1/user/view-profile:
 *   get:
 *     summary: View the user's profile
 *     description: Allows a user to view their profile information. Requires a valid authorization token.
 *     tags: [V1 User Management]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved the user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 UserID:
 *                   type: integer
 *                   example: 2
 *                 Name:
 *                   type: string
 *                   example: Gustavo Fring
 *                 Role:
 *                   type: string
 *                   example: Owner
 *                 ContactDetails:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 Login:
 *                   type: string
 *                   example: Gus
 *                 CreationDate:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-06-27T18:14:59.000Z
 *                 ModificationDate:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-07-03T09:10:30.000Z
 *                 location:
 *                   type: object
 *                   properties:
 *                     LocationID:
 *                       type: integer
 *                       example: 2
 *                     Address:
 *                       type: string
 *                       example: 12000 – 12100 Coors Rd SW
 *                     City:
 *                       type: string
 *                       example: Albuquerque
 *                     State:
 *                       type: string
 *                       example: New Mexico
 *                     ZipCode:
 *                       type: string
 *                       example: 87045
 *                     Country:
 *                       type: string
 *                       example: USA
 *                     CreationDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-07-03T09:09:25.000Z
 *                     ModificationDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-07-03T09:09:25.000Z
 *                   additionalProperties: false
 *       401:
 *         description: Unauthorized - No token found or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: User does not exist - Invalid user (Fake token or deleted user)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User does not exist
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

router.get(
  "/user/view-profile",
  UserVerifyMiddleware.VerifyUser,
  UserController.ViewProfile
);

/**
 * @swagger
 * /api/v1/user/update:
 *   patch:
 *     summary: Update the user's profile information
 *     description: Allows a user to update their profile information. Requires a valid authorization token. Empty fields are acceptable.
 *     tags: [V1 User Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gustavo Fring
 *               contactDetails:
 *                 type: string
 *                 example: Phone
 *               login:
 *                 type: string
 *                 example: Gustavo
 *               password:
 *                 type: string
 *                 example: ChickenMan
 *               locationID:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully
 *                 result:
 *                   type: object
 *                   properties:
 *                     fieldCount:
 *                       type: integer
 *                       example: 0
 *                     affectedRows:
 *                       type: integer
 *                       example: 1
 *                     insertId:
 *                       type: integer
 *                       example: 0
 *                     serverStatus:
 *                       type: integer
 *                       example: 2
 *                     warningCount:
 *                       type: integer
 *                       example: 0
 *                     message:
 *                       type: string
 *                       example: "(Rows matched: 1  Changed: 1  Warnings: 0"
 *                     protocol41:
 *                       type: boolean
 *                       example: true
 *                     changedRows:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Invalid LocationID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid LocationID
 *       401:
 *         description: Unauthorized - No token found or invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: User does not exist - Invalid user (Fake token or deleted user)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User does not exist
 *       409:
 *         description: Duplicate username error - the username already exist in the DB
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Duplicate username error
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
