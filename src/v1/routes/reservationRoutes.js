const express = require("express");
const ReservationController = require("../controllers/reservationController");
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");
const router = express.Router();

// CURRENT VERSION DOES NOT SUPPORT CUSTOMER RESERVE FOR THEMSELVES
// GetReservationsByStatusAndLocationID Endpoint
/**
 * @swagger
 * /api/v1/reservation/location/{id}/status/{status}:
 *   get:
 *     summary: Get reservations by status and location ID
 *     description: Retrieve reservations based on the provided status and location ID. Requires Waiter role.
 *     tags: [V1 Reservation Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the location
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Pending, Confirmed, Cancelled]
 *         description: Status of the reservations
 *     responses:
 *       200:
 *         description: Reservations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reservations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ReservationID:
 *                         type: integer
 *                       UserID:
 *                         type: integer
 *                       TableID:
 *                         type: integer
 *                       ReservationTime:
 *                         type: string
 *                         format: date-time
 *                       SpecialRequests:
 *                         type: string
 *                         nullable: true
 *                       Status:
 *                         type: string
 *                       LocationID:
 *                         type: integer
 *       400:
 *         description: Bad request - Missing or invalid status or location ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     MissingRequiredFields:
 *                       value: "Status and LocationID are required"
 *                     InvalidStatus:
 *                       value: "Invalid Status"
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
router.get(
  "/reservation/location/:id/status/:status",
  UserVerifyMiddleware.VerifyWaiter,
  ReservationController.GetReservationsByStatusAndLocationID
);
// ViewReservationsByLocationID Endpoint
/**
 * @swagger
 * /api/v1/reservation/location/{id}:
 *   get:
 *     summary: View reservations by location ID
 *     description: Retrieve all reservations for a specific location. Requires Waiter role.
 *     tags: [V1 Reservation Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the location
 *     responses:
 *       200:
 *         description: Reservations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reservations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ReservationID:
 *                         type: integer
 *                       UserID:
 *                         type: integer
 *                       TableID:
 *                         type: integer
 *                       ReservationTime:
 *                         type: string
 *                         format: date-time
 *                       SpecialRequests:
 *                         type: string
 *                         nullable: true
 *                       Status:
 *                         type: string
 *                       LocationID:
 *                         type: integer
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
router.get(
  "/reservation/location/:id",
  UserVerifyMiddleware.VerifyWaiter,
  ReservationController.ViewReservationsByLocationID
);
// ViewReservationByID Endpoint
/**
 * @swagger
 * /api/v1/reservation/{id}:
 *   get:
 *     summary: View reservation by ID
 *     description: Retrieve a reservation by its ID. Requires Waiter role.
 *     tags: [V1 Reservation Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the reservation
 *     responses:
 *       200:
 *         description: Reservation retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reservation:
 *                   type: object
 *                   properties:
 *                     ReservationID:
 *                       type: integer
 *                     UserID:
 *                       type: integer
 *                     TableID:
 *                       type: integer
 *                     ReservationTime:
 *                       type: string
 *                       format: date-time
 *                     SpecialRequests:
 *                       type: string
 *                       nullable: true
 *                     Status:
 *                       type: string
 *                     LocationID:
 *                       type: integer
 *       400:
 *         description: Bad request - Missing reservation ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ReservationID is required"
 *       404:
 *         description: Reservation not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reservation not found"
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
router.get(
  "/reservation/:id",
  UserVerifyMiddleware.VerifyWaiter,
  ReservationController.ViewReservationByID
);
// CreateReservation Endpoint
/**
 * @swagger
 * /api/v1/reservation/:
 *   post:
 *     summary: Create a new reservation
 *     description: Create a new reservation with the provided details. Requires Waiter role.
 *     tags: [V1 Reservation Management]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tableID:
 *                 type: integer
 *               reservationTime:
 *                 type: string
 *                 format: date-time
 *               specialRequest:
 *                 type: string
 *                 nullable: true
 *               status:
 *                 type: string
 *                 enum: [Pending, Confirmed, Cancelled]
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reservation created successfully"
 *                 ReservationID:
 *                   type: integer
 *       400:
 *         description: Bad request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     MissingFields:
 *                       value: "Required fields are missing"
 *                     InvalidStatus:
 *                       value: "Invalid Status"
 *                     InvalidDate:
 *                       value: "Invalid reservation date"
 *                     PastTime:
 *                       value: "Reservation time cannot be in the past"
 *                     FutureTime:
 *                       value: "Reservation time cannot be more than a week in advance"
 *                     InvalidTable:
 *                       value: "Table does not exist"
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
  "/reservation",
  UserVerifyMiddleware.VerifyWaiter,
  ReservationController.CreateReservation
);

// UpdateReservationStatus Endpoint
/**
 * @swagger
 * /api/v1/reservation/{id}:
 *   patch:
 *     summary: Update reservation status
 *     description: Update the status of a reservation. Requires Waiter role.
 *     tags: [V1 Reservation Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the reservation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Pending, Confirmed, Cancelled]
 *     responses:
 *       200:
 *         description: Reservation status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reservation status updated successfully"
 *       400:
 *         description: Bad request - Missing or invalid status or reservation ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     MissingFields:
 *                       value: "ReservationID and status are required"
 *                     InvalidStatus:
 *                       value: "Invalid Status"
 *       404:
 *         description: Reservation not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reservation not found"
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
  "/reservation/:id",
  UserVerifyMiddleware.VerifyWaiter,
  ReservationController.UpdateReservationStatus
);

// DeleteReservation Endpoint
/**
 * @swagger
 * /api/v1/reservation/{id}:
 *   delete:
 *     summary: Delete a reservation
 *     description: Delete a reservation identified by the provided ID. Requires Waiter role.
 *     tags: [V1 Reservation Management]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the reservation
 *     responses:
 *       200:
 *         description: Reservation deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reservation deleted successfully"
 *       400:
 *         description: Bad request - Missing reservation ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ReservationID is required"
 *       404:
 *         description: Reservation not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Reservation not found"
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
  "/reservation/:id",
  UserVerifyMiddleware.VerifyWaiter,
  ReservationController.DeleteReservation
);

module.exports = router;
