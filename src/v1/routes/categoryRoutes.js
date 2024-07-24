const express = require("express");
const CategoryController = require("../controllers/categoryController");
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");
const router = express.Router();

/**
 * @swagger
 * /api/v1/category:
 *   post:
 *     summary: Create a new category
 *     description: Creates a new category. Requires the Owner role.
 *     tags: [V1 Category Management]
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
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category created successfully"
 *                 CategoryID:
 *                   type: integer
 *                   example: 10
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
  "/category",
  UserVerifyMiddleware.VerifyOwner,
  CategoryController.CreateCategory
);
/**
 * @swagger
 * /api/v1/category/{id}:
 *   patch:
 *     summary: Modify an existing category
 *     description: Modifies a category identified by the provided ID. Requires the Owner role.
 *     tags: [V1 Category Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the category to modify
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
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category updated successfully"
 *       400:
 *         description: Bad request - Missing or invalid Category ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "CategoryID is required"
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category does not exist"
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
  "/category/:id",
  UserVerifyMiddleware.VerifyOwner,
  CategoryController.ModifyCategory
);
/**
 * @swagger
 * /api/v1/category/{id}:
 *   get:
 *     summary: Get category by ID
 *     description: Retrieves a category by its ID.
 *     tags: [V1 Category Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the category to retrieve
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 category:
 *                   type: object
 *                   properties:
 *                     CategoryID:
 *                       type: integer
 *                       example: 10
 *                     Name:
 *                       type: string
 *                       example: "Los Pollos's Chicken"
 *                     Description:
 *                       type: string
 *                       example: "Los Pollos Hermanos's chicken"
 *                     CreatedBy:
 *                       type: integer
 *                       nullable: true
 *                     ModifiedBy:
 *                       type: integer
 *                       nullable: true
 *                     CreationDate:
 *                       type: string
 *                       format: date-time
 *                     ModificationDate:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category not found"
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

router.get("/category/:id", CategoryController.ViewByID);
// router.get("/category/:id/dishes", DishController.ViewByCategoryID);
// View all category
/**
 * @swagger
 * /api/v1/category:
 *   get:
 *     summary: Get all categories
 *     description: Retrieves all categories.
 *     tags: [V1 Category Management]
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       CategoryID:
 *                         type: integer
 *                       Name:
 *                         type: string
 *                       Description:
 *                         type: string
 *                       CreatedBy:
 *                         type: integer
 *                         nullable: true
 *                       ModifiedBy:
 *                         type: integer
 *                         nullable: true
 *                       CreationDate:
 *                         type: string
 *                         format: date-time
 *                       ModificationDate:
 *                         type: string
 *                         format: date-time
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

router.get("/category", CategoryController.ViewCategory);
/**
 * @swagger
 * /api/v1/category/{id}:
 *   delete:
 *     summary: Delete a category
 *     description: Deletes a category identified by the provided ID if the user has the Owner role and provides a valid token.
 *     tags: [V1 Category Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category deleted successfully"
 *       400:
 *         description: Bad request - There are still dishes linked to this category
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "There are still dishes linked to this category, please delete, or modify them first"
 *                 dishes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       DishID:
 *                         type: integer
 *                       DishName:
 *                         type: string
 *                       Description:
 *                         type: string
 *                       Price:
 *                         type: number
 *                       PreparationTime:
 *                         type: integer
 *                       ImageLink:
 *                         type: string
 *                       CreationDate:
 *                         type: string
 *                         format: date-time
 *                       ModificationDate:
 *                         type: string
 *                         format: date-time
 *                       CreatedBy:
 *                         type: integer
 *                         nullable: true
 *                       ModifiedBy:
 *                         type: integer
 *                         nullable: true
 *                       CategoryID:
 *                         type: integer
 *                       CategoryName:
 *                         type: string
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Category not found"
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
  "/category/:id",
  UserVerifyMiddleware.VerifyOwner,
  CategoryController.DeleteCategory
);

router.all("/categories", methodNotAllowedHandler);

function methodNotAllowedHandler(req, res, next) {
  res.status(405).send("Method Not Allowed");
}

module.exports = router;
