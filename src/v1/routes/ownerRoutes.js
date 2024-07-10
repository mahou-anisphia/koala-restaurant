const express = require("express");
// const UserController = require("../controllers/userController");
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");
const OwnerController = require("../controllers/ownerController");

const router = express.Router();
/**
 * @swagger
 * /api/v1/owner/create-user:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with roles Owner, Waiter, Chef, or Customer. Requires authorization.
 *     tags: [V1 Owner Manage Users]
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
 *                 description: Name of the user
 *                 example: Tiger D. Dragon
 *               role:
 *                 type: string
 *                 description: Role of the user
 *                 example: Owner
 *               login:
 *                 type: string
 *                 description: Login username for the user
 *                 example: Ego
 *               password:
 *                 type: string
 *                 description: Password for the user
 *                 example: hehe
 *               locationID:
 *                 type: integer
 *                 description: ID of the user's location
 *                 example: 2
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *                 userID:
 *                   type: integer
 *                   example: 14
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Invalid LocationID
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Invalid Role
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Forbidden
 *       404:
 *         description: User does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User does not exist
 *       409:
 *         description: Duplicate username error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Duplicate username error
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

router.post(
  "/owner/create-user/",
  UserVerifyMiddleware.VerifyOwner,
  OwnerController.CreateUser
);
/**
 * @swagger
 * /api/v1/owner/update-user/{id}:
 *   patch:
 *     summary: Update an existing user
 *     description: Update an existing user's details. Requires authorization.
 *     tags: [V1 Owner Manage Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user
 *                 example: Tiger D. Dragon
 *               contactDetails:
 *                 type: string
 *                 description: Contact details of the user
 *                 example: email
 *               role:
 *                 type: string
 *                 description: Role of the user
 *                 example: Owner
 *               login:
 *                 type: string
 *                 description: Login username for the user
 *                 example: Ego
 *               locationID:
 *                 type: integer
 *                 description: ID of the user's location
 *                 example: 2
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
 *                       example: |
 *                         (Rows matched: 1  Changed: 0  Warnings: 0
 *                     protocol41:
 *                       type: boolean
 *                       example: true
 *                     changedRows:
 *                       type: integer
 *                       example: 0
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Invalid LocationID
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Invalid Role
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Forbidden
 *       404:
 *         description: User does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User does not exist
 *       409:
 *         description: Duplicate username error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Duplicate username error
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

router.patch(
  "/owner/update-user/:id",
  UserVerifyMiddleware.VerifyOwner,
  OwnerController.UpdateUser
);

/**
 * @swagger
 * /api/v1/owner/delete-user/{id}:
 *   delete:
 *     summary: Delete an existing user
 *     description: Delete an existing user by their ID. Requires authorization.
 *     tags: [V1 Owner Manage Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to be deleted
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully.
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Forbidden
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: User not found.
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: User does not exist
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

router.delete(
  "/owner/delete-user/:id",
  UserVerifyMiddleware.VerifyOwner,
  OwnerController.DeleteUser
);

/**
 * @swagger
 * /api/v1/owner/view-user/location/{id}:
 *   get:
 *     summary: View employees at a specific location
 *     description: Retrieve a list of employees at a specific location. Requires authorization.
 *     tags: [V1 Owner Manage Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the location
 *     responses:
 *       200:
 *         description: List of users at the specified location
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   UserID:
 *                     type: integer
 *                     example: 2
 *                   Name:
 *                     type: string
 *                     example: Gustavo Fring
 *                   Role:
 *                     type: string
 *                     example: Owner
 *                   ContactDetails:
 *                     type: string
 *                     example: Phone
 *                   Login:
 *                     type: string
 *                     example: Gustavo
 *                   CreationDate:
 *                     type: string
 *                     format: date-time
 *                     example: 2024-06-27T18:14:59.000Z
 *                   ModificationDate:
 *                     type: string
 *                     format: date-time
 *                     example: 2024-07-09T09:27:26.000Z
 *                   LocationID:
 *                     type: integer
 *                     example: 2
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Forbidden
 *       404:
 *         description: No users found at the specified location or invalid user
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: There is no user in this location
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: User does not exist
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

router.get(
  "/owner/view-user/location/:id",
  UserVerifyMiddleware.VerifyOwner,
  OwnerController.ViewEmployeeOnLocation
);

/**
 * @swagger
 * /api/v1/owner/view-user/{id}:
 *   get:
 *     summary: View employee account details
 *     description: Retrieve the account details of a specific user. Requires authorization.
 *     tags: [V1 Owner Manage Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User account details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     UserID:
 *                       type: integer
 *                       example: 1
 *                     Name:
 *                       type: string
 *                       example: Walter Hartwell White
 *                     Role:
 *                       type: string
 *                       example: Chef
 *                     ContactDetails:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     Login:
 *                       type: string
 *                       example: Heisenberg
 *                     CreationDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-06-27T18:14:58.000Z
 *                     ModificationDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-07-08T07:23:31.000Z
 *                     LocationID:
 *                       type: integer
 *                       example: 1
 *                 location:
 *                   type: object
 *                   properties:
 *                     LocationID:
 *                       type: integer
 *                       example: 1
 *                     Address:
 *                       type: string
 *                       example: 308 Negra Arroyo Lane
 *                     City:
 *                       type: string
 *                       example: Albuquerque
 *                     State:
 *                       type: string
 *                       example: New Mexico
 *                     ZipCode:
 *                       type: string
 *                       example: 87104
 *                     Country:
 *                       type: string
 *                       example: USA
 *                     CreationDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-06-27T18:07:48.000Z
 *                     ModificationDate:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-06-27T18:07:48.000Z
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Forbidden
 *       404:
 *         description: User does not exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User does not exist
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

router.get(
  "/owner/view-user/:id",
  UserVerifyMiddleware.VerifyOwner,
  OwnerController.ViewEmployeeAccount
);

/**
 * @swagger
 * /api/v1/owner/view-user:
 *   get:
 *     summary: View all employees
 *     description: Retrieve a list of all employees. Requires authorization.
 *     tags: [V1 Owner Manage Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   UserID:
 *                     type: integer
 *                     example: 1
 *                   Name:
 *                     type: string
 *                     example: Walter Hartwell White
 *                   Role:
 *                     type: string
 *                     example: Chef
 *                   ContactDetails:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *                   Login:
 *                     type: string
 *                     example: Heisenberg
 *                   CreationDate:
 *                     type: string
 *                     format: date-time
 *                     example: 2024-06-27T18:14:58.000Z
 *                   LocationID:
 *                     type: integer
 *                     example: 1
 *                   ModificationDate:
 *                     type: string
 *                     format: date-time
 *                     example: 2024-07-08T07:23:31.000Z
 *                   Location:
 *                     type: string
 *                     example: 308 Negra Arroyo Lane, Albuquerque, New Mexico 87104, USA
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Forbidden
 *       404:
 *         description: User does not exist
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
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

router.get(
  "/owner/view-user",
  UserVerifyMiddleware.VerifyOwner,
  OwnerController.ViewAllEmployee
);
/**
 * @swagger
 * /api/v1/owner/assign-role/{id}:
 *   patch:
 *     summary: Assign a new role to a user
 *     description: Update the role of a user by their ID. Requires authorization.
 *     tags: [V1 Owner Manage Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user to assign the role to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 example: Waiter
 *     responses:
 *       200:
 *         description: User role updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User role updated successfully
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
 *                       example: |
 *                         (Rows matched: 1  Changed: 1  Warnings: 0
 *                     protocol41:
 *                       type: boolean
 *                       example: true
 *                     changedRows:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Invalid role
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid role
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Forbidden
 *       404:
 *         description: User not found or invalid user
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: User not found
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: User does not exist
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

router.patch(
  "/owner/assign-role/:id",
  UserVerifyMiddleware.VerifyOwner,
  OwnerController.AssignUserRole
);
/**
 * @swagger
 * /api/v1/owner/search-user/{searchQueries}:
 *   post:
 *     summary: Search for users by location, name, or login name
 *     description: Search for users based on a location, name, or login name. Only one parameter is accepted per request. Requires authorization.
 *     tags: [V1 Owner Manage Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: searchQueries
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query parameter (location, name, or login name)
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *                 example: "Albuquerque"
 *               name:
 *                 type: string
 *                 example: "Walter"
 *               login:
 *                 type: string
 *                 example: "Heisenberg"
 *     responses:
 *       200:
 *         description: Users matching the search criteria retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   UserID:
 *                     type: integer
 *                     example: 1
 *                   Name:
 *                     type: string
 *                     example: Walter Hartwell White
 *                   Role:
 *                     type: string
 *                     example: Chef
 *                   ContactDetails:
 *                     type: string
 *                     nullable: true
 *                     example: null
 *                   Login:
 *                     type: string
 *                     example: Heisenberg
 *                   CreationDate:
 *                     type: string
 *                     format: date-time
 *                     example: 2024-06-27T18:14:58.000Z
 *                   LocationID:
 *                     type: integer
 *                     example: 1
 *                   ModificationDate:
 *                     type: string
 *                     format: date-time
 *                     example: 2024-07-08T07:23:31.000Z
 *                   Location:
 *                     type: string
 *                     example: 308 Negra Arroyo Lane, Albuquerque, New Mexico 87104, USA
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Forbidden
 *       404:
 *         description: User does not exist
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
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

router.post(
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
