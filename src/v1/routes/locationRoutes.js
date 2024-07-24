const express = require("express");
const LocationController = require("../controllers/locationController");
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");
const router = express.Router();

/**
 * @swagger
 * /api/v1/location/:
 *   get:
 *     summary: Retrieve all locations
 *     description: Returns a list of all available locations
 *     tags: [V1 Location Routes Management]
 *     responses:
 *       200:
 *         description: A list of locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   LocationID:
 *                     type: integer
 *                     example: 1
 *                   Address:
 *                     type: string
 *                     example: "308 Negra Arroyo Lane"
 *                   City:
 *                     type: string
 *                     example: "Albuquerque"
 *                   State:
 *                     type: string
 *                     example: "New Mexico"
 *                   ZipCode:
 *                     type: string
 *                     example: "87104"
 *                   Country:
 *                     type: string
 *                     example: "USA"
 *                   CreationDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-06-27T18:07:48.000Z"
 *                   ModificationDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-06-27T18:07:48.000Z"
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
router.get("/location/", LocationController.ViewAllLocation);

/**
 * @swagger
 * /api/v1/location/search/{searchQueries}:
 *   post:
 *     summary: Search for locations based on queries
 *     description: Returns a list of locations that match the search queries
 *     tags: [V1 Location Routes Management]
 *     parameters:
 *       - in: path
 *         name: searchQueries
 *         required: true
 *         schema:
 *           type: string
 *         description: The search queries to find matching locations
 *     responses:
 *       200:
 *         description: A list of matching locations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   LocationID:
 *                     type: integer
 *                     example: 1
 *                   Address:
 *                     type: string
 *                     example: "308 Negra Arroyo Lane"
 *                   City:
 *                     type: string
 *                     example: "Albuquerque"
 *                   State:
 *                     type: string
 *                     example: "New Mexico"
 *                   ZipCode:
 *                     type: string
 *                     example: "87104"
 *                   Country:
 *                     type: string
 *                     example: "USA"
 *                   CreationDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-06-27T18:07:48.000Z"
 *                   ModificationDate:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-06-27T18:07:48.000Z"
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
  "/location/search/:searchQueries",
  LocationController.SearchLocation
);
/**
 * @swagger
 * /api/v1/location/{id}:
 *   get:
 *     summary: Retrieve a location by ID
 *     description: Returns a location object based on the provided
 *     tags: [V1 Location Routes Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the location to retrieve
 *     responses:
 *       200:
 *         description: A location object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 LocationID:
 *                   type: integer
 *                   example: 1
 *                 Address:
 *                   type: string
 *                   example: "308 Negra Arroyo Lane"
 *                 City:
 *                   type: string
 *                   example: "Albuquerque"
 *                 State:
 *                   type: string
 *                   example: "New Mexico"
 *                 ZipCode:
 *                   type: string
 *                   example: "87104"
 *                 Country:
 *                   type: string
 *                   example: "USA"
 *                 CreationDate:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-06-27T18:07:48.000Z"
 *                 ModificationDate:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-06-27T18:07:48.000Z"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Location ID is required"
 *       404:
 *         description: Location not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Location not found"
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
router.get("/location/:id", LocationController.ViewLocation);
/**
 * @swagger
 * /api/v1/location:
 *   post:
 *     summary: Create a new location
 *     description: Creates a new location entry if the user has the Owner role and provides a valid token.
 *     tags: [V1 Location Routes Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 example: "to be deleted"
 *               city:
 *                 type: string
 *                 example: "Albuquerque"
 *               state:
 *                 type: string
 *                 example: "New Mexico"
 *               zipCode:
 *                 type: string
 *                 example: "87101"
 *               country:
 *                 type: string
 *                 example: "USA"
 *     responses:
 *       201:
 *         description: Location created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Location created"
 *                 locationID:
 *                   type: integer
 *                   example: 4
 *       400:
 *         description: Missing input fields or invalid request payload
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing input fields"
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
 *         description: Forbidden - User does not have required role (Owner)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Forbidden"
 *       404:
 *         description: User does not exist (Invalid or deleted user)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User does not exist"
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
  "/location/",
  UserVerifyMiddleware.VerifyOwner,
  LocationController.CreateLocation
);
/**
 * @swagger
 * /api/v1/location/{id}:
 *   patch:
 *     summary: Update location details
 *     description: Updates location details identified by the provided ID if the user has the Owner role and provides a valid token.
 *     tags: [V1 Location Routes Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the location to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 example: "1600 Pennsylvania Avenue NW"
 *               city:
 *                 type: string
 *                 example: "Albuquerque"
 *               state:
 *                 type: string
 *                 example: "New Mexico"
 *               zipCode:
 *                 type: string
 *                 example: "87101"
 *               country:
 *                 type: string
 *                 example: "USA"
 *     responses:
 *       200:
 *         description: Location updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Location updated"
 *       400:
 *         description: Bad request - Missing location ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "LocationID is required"
 *       404:
 *        description: Location or user not found
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example:
 *                        Location not found
 *                - type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example:
 *                        User does not exist
 *
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
 *         description: Forbidden - User does not have required role (Owner)
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
router.patch(
  "/location/:id",
  UserVerifyMiddleware.VerifyOwner,
  LocationController.UpdateLocation
);
/**
 * @swagger
 * /api/v1/location/{id}:
 *   delete:
 *     summary: Delete a location
 *     description: Deletes a location identified by the provided ID if the user has the Owner role and provides a valid token.
 *     tags: [V1 Location Routes Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the location to delete
 *     responses:
 *       200:
 *         description: Location deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Location deleted"
 *       400:
 *         description: Bad request - Missing location ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "LocationID is required"
 *       404:
 *        description: Location or user not found
 *        content:
 *          application/json:
 *            schema:
 *              oneOf:
 *                - type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example:
 *                        Location not found
 *                - type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example:
 *                        User does not exist
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
 *         description: Forbidden - User does not have required role (Owner)
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
router.delete(
  "/location/:id",
  UserVerifyMiddleware.VerifyOwner,
  LocationController.DeleteLocation
);

router.all("/location", methodNotAllowedHandler);

function methodNotAllowedHandler(req, res, next) {
  res.status(405).send("Method Not Allowed");
}

module.exports = router;
