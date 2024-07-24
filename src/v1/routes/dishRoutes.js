const express = require("express");
const DishController = require("../controllers/dishController");
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");
const router = express.Router();

// Route to add a new dish
/**
 * @swagger
 * /api/v1/dishes:
 *   post:
 *     summary: Add a new dish
 *     description: Adds a new dish to the menu if the user has the Waiter role and provides a valid token.
 *     tags: [V1 Dish Routes Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: string
 *               preparationTime:
 *                 type: integer
 *               categoryID:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Dish uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dish uploaded successfully"
 *                 dishID:
 *                   type: integer
 *                   example: 3
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               oneOf:
 *                 - properties:
 *                     message:
 *                       type: string
 *                       example: "Dish Missing Field!"
 *                 - properties:
 *                     message:
 *                       type: string
 *                       example: "Error uploading file"
 *                 - properties:
 *                     message:
 *                       type: string
 *                       example: "No file uploaded"
 *                 - properties:
 *                     message:
 *                       type: string
 *                       example: "Category Does Not Exist"
 *       401:
 *         description: Unauthorized request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       403:
 *         description: Forbidden - User does not have required role (Waiter)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Forbidden"
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
router.post(
  "/dishes",
  UserVerifyMiddleware.VerifyWaiter,
  DishController.addDish
);
// Route to update an existing dish

/**
 * @swagger
 * /api/v1/dishes/{id}:
 *   patch:
 *     summary: Update a dish
 *     description: Updates a dish identified by the provided ID if the user has the Waiter role and provides a valid token. Empty fields are acceptable.
 *     tags: [V1 Dish Routes Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the dish to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: string
 *               preparationTime:
 *                 type: integer
 *               categoryID:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Dish updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dish updated successfully"
 *                 result:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category Does Not Exist"
 *       401:
 *         description: Unauthorized request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       403:
 *         description: Forbidden - User does not have required role (Waiter)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Forbidden"
 *       404:
 *         description: Dish not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dish not found"
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
router.patch(
  "/dishes/:id",
  UserVerifyMiddleware.VerifyWaiter,
  DishController.updateDish
);
// Route to delete a dish

/**
 * @swagger
 * /api/v1/dishes/{id}:
 *   delete:
 *     summary: Delete a dish
 *     description: Deletes a dish identified by the provided ID if the user provides a valid token.
 *     tags: [V1 Dish Routes Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the dish to delete
 *     responses:
 *       200:
 *         description: Dish deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dish deleted successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dish ID is required"
 *       401:
 *         description: Unauthorized request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       403:
 *         description: Forbidden - User does not have required role (Waiter)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Forbidden"
 *       404:
 *         description: Dish not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dish not found"
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
router.delete(
  "/dishes/:id",
  UserVerifyMiddleware.VerifyWaiter,
  DishController.deleteDish
);
// Route to get details of a specific dish

/**
 * @swagger
 * /api/v1/dishes/{id}:
 *   get:
 *     summary: Get a dish by ID
 *     description: Retrieves details of a dish identified by the provided ID.
 *     tags: [V1 Dish Routes Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the dish to retrieve
 *     responses:
 *       200:
 *         description: Dish retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 DishID:
 *                   type: integer
 *                   example: 2
 *                 DishName:
 *                   type: string
 *                   example: "Heisenberg Speciality"
 *                 Description:
 *                   type: string
 *                   example: "Special from Heisenberg"
 *                 Price:
 *                   type: number
 *                   example: 100
 *                 PreparationTime:
 *                   type: integer
 *                   example: 200
 *                 ImageLink:
 *                   type: string
 *                   example: "https://prod-restaurant-bucket.s3.amazonaws.com/3228b916-5f87-4914-8041-427ed56abd45-Heisenberg.jpg"
 *                 CreationDate:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-07-04T09:22:01.000Z"
 *                 ModificationDate:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-07-05T06:08:28.000Z"
 *                 CreatedBy:
 *                   type: string
 *                   nullable: true
 *                 ModifiedBy:
 *                   type: string
 *                   nullable: true
 *                 CategoryID:
 *                   type: integer
 *                   example: 1
 *                 CategoryName:
 *                   type: string
 *                   example: "Beverages"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dish ID is required"
 *       404:
 *         description: Dish not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dish not found"
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
router.get("/dishes/:id", DishController.getDishByID);
// search function

/**
 * @swagger
 * /api/v1/dishes/search/{searchQueries}:
 *   post:
 *     summary: Search dishes
 *     description: Searches for dishes by name or description.
 *     tags: [V1 Dish Routes Management]
 *     parameters:
 *       - in: path
 *         name: searchQueries
 *         required: true
 *         schema:
 *           type: string
 *         description: Search queries for dish names or descriptions
 *     responses:
 *       200:
 *         description: Dishes found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   DishID:
 *                     type: integer
 *                     example: 2
 *                   DishName:
 *                     type: string
 *                     example: "Heisenberg Speciality"
 *                   Description:
 *                     type: string
 *                     example: "Special from Heisenberg"
 *                   Price:
 *                     type: number
 *                     example: 100
 *                   PreparationTime:
 *                     type: integer
 *                     example: 200
 *                   ImageLink:
 *                     type: string
 *                     example: "https://prod-restaurant-bucket.s3.amazonaws.com/3228b916-5f87-4914-8041-427ed56abd45-Heisenberg.jpg"
 *                   CreationDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-07-04T09:22:01.000Z"
 *                   ModificationDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-07-05T06:08:28.000Z"
 *                   CreatedBy:
 *                     type: string
 *                     nullable: true
 *                   ModifiedBy:
 *                     type: string
 *                     nullable: true
 *                   CategoryID:
 *                     type: integer
 *                     example: 1
 *                   CategoryName:
 *                     type: string
 *                     example: "Beverages"
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
router.post("/dishes/search/:searchQueries", DishController.SearchDishes);

/**
 * @swagger
 * /api/v1/dishes/category/{id}:
 *   get:
 *     summary: Get dishes by category ID
 *     description: Retrieves dishes belonging to a specific category identified by the provided ID.
 *     tags: [V1 Dish Routes Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the category to retrieve dishes from
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
 *                   DishID:
 *                     type: integer
 *                     example: 2
 *                   DishName:
 *                     type: string
 *                     example: "Heisenberg Speciality"
 *                   Description:
 *                     type: string
 *                     example: "Special from Heisenberg"
 *                   Price:
 *                     type: number
 *                     example: 100
 *                   PreparationTime:
 *                     type: integer
 *                     example: 200
 *                   ImageLink:
 *                     type: string
 *                     example: "https://prod-restaurant-bucket.s3.amazonaws.com/3228b916-5f87-4914-8041-427ed56abd45-Heisenberg.jpg"
 *                   CreationDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-07-04T09:22:01.000Z"
 *                   ModificationDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-07-05T06:08:28.000Z"
 *                   CreatedBy:
 *                     type: string
 *                     nullable: true
 *                   ModifiedBy:
 *                     type: string
 *                     nullable: true
 *                   CategoryID:
 *                     type: integer
 *                     example: 1
 *                   CategoryName:
 *                     type: string
 *                     example: "Beverages"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category ID is required"
 *       404:
 *         description: No dishes found for the given category ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No dishes found for the given category ID"
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
// Route to get by category ID
router.get("/dishes/category/:id", DishController.getDishesByCategoryID);
// Route to get all dishes

/**
 * @swagger
 * /api/v1/dishes:
 *   get:
 *     summary: Get all dishes
 *     description: Retrieves all dishes in the menu.
 *     tags: [V1 Dish Routes Management]
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
 *                   DishID:
 *                     type: integer
 *                     example: 2
 *                   DishName:
 *                     type: string
 *                     example: "Heisenberg Speciality"
 *                   Description:
 *                     type: string
 *                     example: "Special from Heisenberg"
 *                   Price:
 *                     type: number
 *                     example: 100
 *                   PreparationTime:
 *                     type: integer
 *                     example: 200
 *                   ImageLink:
 *                     type: string
 *                     example: "https://prod-restaurant-bucket.s3.amazonaws.com/3228b916-5f87-4914-8041-427ed56abd45-Heisenberg.jpg"
 *                   CreationDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-07-04T09:22:01.000Z"
 *                   ModificationDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-07-05T06:08:28.000Z"
 *                   CreatedBy:
 *                     type: string
 *                     nullable: true
 *                   ModifiedBy:
 *                     type: string
 *                     nullable: true
 *                   CategoryID:
 *                     type: integer
 *                     example: 1
 *                   CategoryName:
 *                     type: string
 *                     example: "Beverages"
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
router.get("/dishes", DishController.getAllDishes);

router.all("/dishes", methodNotAllowedHandler);

function methodNotAllowedHandler(req, res, next) {
  res.status(405).send("Method Not Allowed");
}

module.exports = router;
