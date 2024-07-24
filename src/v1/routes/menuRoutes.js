const express = require("express");
const router = express.Router();
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");
const MenuController = require("../controllers/menuController");

/**
 * @swagger
 * /api/v1/menu/{id}:
 *   get:
 *     summary: Get a menu by ID
 *     description: Retrieves a menu by its ID.
 *     tags: [V1 Menu Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the menu to retrieve
 *     responses:
 *       200:
 *         description: Menu retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 MenuID:
 *                   type: integer
 *                 Name:
 *                   type: string
 *                 Description:
 *                   type: string
 *                 CreationDate:
 *                   type: string
 *                   format: date-time
 *                 ModificationDate:
 *                   type: string
 *                   format: date-time
 *                 LocationID:
 *                   type: integer
 *                 CreatedBy:
 *                   type: integer
 *                 ModifiedBy:
 *                   type: integer
 *       400:
 *         description: Bad request - Missing Menu ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Menu ID is required"
 *       404:
 *         description: Menu not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Menu not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

// Route to get an abstract menu by ID
router.get("/menu/:id", MenuController.GetMenuByID);

/**
 * @swagger
 * /api/v1/menu/location/{id}:
 *   get:
 *     summary: Get menus by location ID
 *     description: Retrieves all menus for a specific location by the location's ID.
 *     tags: [V1 Menu Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the location
 *     responses:
 *       200:
 *         description: Menus retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   MenuID:
 *                     type: integer
 *                   Name:
 *                     type: string
 *                   Description:
 *                     type: string
 *                   CreationDate:
 *                     type: string
 *                     format: date-time
 *                   ModificationDate:
 *                     type: string
 *                     format: date-time
 *                   LocationID:
 *                     type: integer
 *                   CreatedBy:
 *                     type: integer
 *                   ModifiedBy:
 *                     type: integer
 *       400:
 *         description: Bad request - Missing location ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Location ID is required"
 *       404:
 *         description: Location or no menus found
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Location does not exist"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "No menu available at this location"
 *                     location:
 *                       type: object
 *                       properties:
 *                         LocationID:
 *                           type: integer
 *                         Address:
 *                           type: string
 *                         City:
 *                           type: string
 *                         State:
 *                           type: string
 *                         ZipCode:
 *                           type: string
 *                         Country:
 *                           type: string
 *                         CreationDate:
 *                           type: string
 *                           format: date-time
 *                         ModificationDate:
 *                           type: string
 *                           format: date-time
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

// Route to get an abstract menu by location ID
router.get("/menu/location/:id", MenuController.GetMenuByLocation);

/**
 * @swagger
 * /api/v1/menu/dishes/{id}:
 *   get:
 *     summary: Get dishes in a menu by menu ID
 *     description: Retrieves all dishes for a specific menu by the menu's ID.
 *     tags: [V1 Menu Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the menu
 *     responses:
 *       200:
 *         description: Dishes retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   MenuID:
 *                     type: integer
 *                   DishID:
 *                     type: integer
 *                   DishName:
 *                     type: string
 *                   DishDescription:
 *                     type: string
 *                   Price:
 *                     type: number
 *                   PreparationTime:
 *                     type: integer
 *                   ImageLink:
 *                     type: string
 *                   Status:
 *                     type: string
 *                   CategoryID:
 *                     type: integer
 *                   CategoryName:
 *                     type: string
 *       400:
 *         description: Bad request - Missing menu ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Menu ID is required"
 *       404:
 *         description: Menu not found or menu with given ID is empty
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Menu not found or menu with given ID is empty"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

// Route to get a detailed menu by ID
router.get("/menu/dishes/:id", MenuController.GetDishesFromMenu);

// Route to get a detailed menu by location ID
// router.get(
//   "/menu/dishes/location/:id",
//   MenuController.GetDishesFromMenuByLocation
// );

/**
 * @swagger
 * /api/v1/menu:
 *   post:
 *     summary: Add a new menu
 *     description: Adds a new menu if the user has the Owner role and provides a valid token.
 *     tags: [V1 Menu Management]
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
 *               description:
 *                 type: string
 *               locationID:
 *                 type: integer
 *             required:
 *               - name
 *               - locationID
 *     responses:
 *       201:
 *         description: Menu added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Menu added successfully"
 *                 menuID:
 *                   type: integer
 *       400:
 *         description: Bad request - Missing field
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Menu Missing Field!"
 *       404:
 *         description: Location not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Location does not exist"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
// Route to add a new menu (requires user verification)
router.post("/menu", UserVerifyMiddleware.VerifyOwner, MenuController.AddMenu);

/**
 * @swagger
 * /api/v1/menu/{id}:
 *   patch:
 *     summary: Update menu details
 *     description: Updates the details of a menu if the user has the Waiter or Owner role and provides a valid token.
 *     tags: [V1 Menu Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the menu to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Menu updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Menu updated successfully"
 *                 result:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request - Missing menu ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "menuID is required"
 *       404:
 *         description: Menu not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Menu not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

// Route to update menu details (requires user verification)
router.patch(
  "/menu/:id",
  UserVerifyMiddleware.VerifyWaiter,
  MenuController.UpdateMenuDetails
);

/**
 * @swagger
 * /api/v1/menu/{id}/dish:
 *   post:
 *     summary: Add a dish to a menu
 *     description: Adds a dish to a menu if the user has the Waiter or Owner role and provides a valid token.
 *     tags: [V1 Menu Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the menu to which the dish will be added
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dishID:
 *                 type: integer
 *             required:
 *               - dishID
 *     responses:
 *       200:
 *         description: Dish added to menu successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Added dish to menu successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "MenuID is required"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Dish to be added does not exist"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Dish already exists in the given menu"
 *       404:
 *         description: Menu not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "The menu with the given ID does not exist"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

// Route to add a dish to a menu (requires user verification)
router.post(
  "/menu/:id/dish",
  UserVerifyMiddleware.VerifyWaiter,
  MenuController.AddDishToMenu
);

//test needed
/**
 * @swagger
 * /api/v1/menu/dish/status:
 *   put:
 *     summary: Modify dish status in a menu
 *     description: Modifies the status of a dish in a menu if the user has the Waiter, Owner, or Chef role and provides a valid token.
 *     tags: [V1 Menu Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dishID:
 *                 type: integer
 *               menuID:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [Available, Unavailable]
 *             required:
 *               - dishID
 *               - menuID
 *               - status
 *     responses:
 *       200:
 *         description: Dish status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dish status updated successfully"
 *       400:
 *         description: Bad request - Missing input field or invalid status
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Missing input field!"
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Invalid Status Entered"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

// Route to modify the status of a dish on a menu (requires user verification)
router.put(
  "/menu/dish/status",
  UserVerifyMiddleware.VerifyWaiterAndChef,
  MenuController.ModifyDishStatus
);

/**
 * @swagger
 * /api/v1/menu/{id}/dish:
 *   delete:
 *     summary: Remove a dish from a menu
 *     description: Removes a dish from a menu if the user has the Waiter or Owner role and provides a valid token.
 *     tags: [V1 Menu Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the menu from which the dish will be removed
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dishID:
 *                 type: integer
 *             required:
 *               - dishID
 *     responses:
 *       200:
 *         description: Dish removed from menu successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dish removed from menu successfully"
 *       400:
 *         description: Bad request - Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing required fields"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

// Route to delete a dish from a menu (requires user verification)
router.delete(
  "/menu/:id/dish",
  UserVerifyMiddleware.VerifyWaiter,
  MenuController.DeleteDishFromMenu
);

/**
 * @swagger
 * /api/v1/menu/{id}:
 *   delete:
 *     summary: Delete a menu
 *     description: Deletes a menu if the user has the Owner role and provides a valid token.
 *     tags: [V1 Menu Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the menu to delete
 *     responses:
 *       200:
 *         description: Menu deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Menu deleted successfully"
 *       400:
 *         description: Bad request - Missing menu ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "MenuID is required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

// Route to delete a menu (requires user verification)
router.delete(
  "/menu/:id",
  UserVerifyMiddleware.VerifyOwner,
  MenuController.DeleteMenu
);

router.all("/menu", methodNotAllowedHandler);
function methodNotAllowedHandler(req, res, next) {
  res.status(405).send("Method Not Allowed");
}
module.exports = router;
