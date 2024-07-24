const express = require("express");
const DiningTableController = require("../controllers/diningTableController");
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");
const router = express.Router();

/**
 * @swagger
 * /api/v1/table:
 *   post:
 *     summary: Create a dining table
 *     description: Creates a dining table with specified capacity and location. Requires Waiter role and a valid token.
 *     tags: [V1 Table Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token from Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               capacity:
 *                 type: integer
 *               location:
 *                 type: string
 *               locationID:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Dining table created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dining table created successfully"
 *                 tableID:
 *                   type: integer
 *       400:
 *         description: Input missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Input missing fields!"
 *       404:
 *         description: Invalid location
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid location!"
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

// Route to create a new dining table
router.post(
  "/table",
  UserVerifyMiddleware.VerifyWaiter,
  DiningTableController.CreateTable
);
/**
 * @swagger
 * /api/v1/table/{id}:
 *   get:
 *     summary: Get dining table by ID
 *     description: Retrieves a dining table by its ID.
 *     tags: [V1 Table Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the dining table to retrieve
 *     responses:
 *       200:
 *         description: Dining table retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 TableID:
 *                   type: integer
 *                 Capacity:
 *                   type: integer
 *                 Location:
 *                   type: string
 *                 LocationID:
 *                   type: integer
 *                 CreatedBy:
 *                   type: integer
 *                 ModifiedBy:
 *                   type: integer
 *                   nullable: true
 *       400:
 *         description: TableID is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "TableID is required"
 *       404:
 *         description: Dining table not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dining table not found"
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

// Route to get a dining table by ID
router.get("/table/:id", DiningTableController.GetByID);

/**
 * @swagger
 * /api/v1/table/{id}:
 *   patch:
 *     summary: Update a dining table
 *     description: Updates the details of a dining table. Requires Waiter role and a valid token.
 *     tags: [V1 Table Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token from Login
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the dining table to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               capacity:
 *                 type: integer
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Dining table updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Dining table updated successfully"
 *       400:
 *         description: TableID is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "TableID is required"
 *       404:
 *         description: Table not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Table not found"
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

// Route to update a dining table
router.patch(
  "/table/:id",
  UserVerifyMiddleware.VerifyWaiter,
  DiningTableController.UpdateTable
);

/**
 * @swagger
 * /api/v1/table/{id}:
 *   delete:
 *     summary: Delete a dining table
 *     description: Deletes a dining table identified by the provided ID if the user has the Waiter role and provides a valid token.
 *     tags: [V1 Table Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Token from Login
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the dining table to delete
 *     responses:
 *       200:
 *         description: Table deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Table deleted successfully"
 *       400:
 *         description: All reservations associated with the table must be deleted first
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "All reservations associated with the table must be deleted first"
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

// Route to delete a dining table (not implemented)
router.delete(
  "/table/:id",
  UserVerifyMiddleware.VerifyWaiter,
  DiningTableController.DeleteTable
);

/**
 * @swagger
 * /api/v1/table/location/{id}:
 *   get:
 *     summary: Get dining tables by location ID
 *     description: Retrieves all dining tables at a specified location.
 *     tags: [V1 Table Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the location to retrieve tables from
 *     responses:
 *       200:
 *         description: Dining tables retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   TableID:
 *                     type: integer
 *                   Capacity:
 *                     type: integer
 *                   Location:
 *                     type: string
 *                   LocationID:
 *                     type: integer
 *                   CreatedBy:
 *                     type: integer
 *                   ModifiedBy:
 *                     type: integer
 *                     nullable: true
 *       400:
 *         description: LocationID is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "LocationID is required!"
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

// Route to get dining tables by location ID
router.get("/table/location/:id", DiningTableController.GetByLocationID);

module.exports = router;
