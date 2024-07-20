const express = require("express");
const ReservationController = require("../controllers/reservationController");
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");
const router = express.Router();

// CURRENT VERSION DOES NOT SUPPORT CUSTOMER RESERVE FOR THEMSELVES
router.get(
  "/reservation/location/:id/status/:status",
  UserVerifyMiddleware.VerifyWaiter,
  ReservationController.GetReservationsByStatusAndLocationID
);
router.get(
  "/reservation/location/:id",
  UserVerifyMiddleware.VerifyWaiter,
  ReservationController.ViewReservationsByLocationID
);
router.get(
  "/reservation/:id",
  UserVerifyMiddleware.VerifyWaiter,
  ReservationController.ViewReservationByID
);
router.post(
  "/reservation",
  UserVerifyMiddleware.VerifyWaiter,
  ReservationController.CreateReservation
);

router.patch(
  "/reservation/:id",
  UserVerifyMiddleware.VerifyWaiter,
  ReservationController.UpdateReservationStatus
);
router.delete(
  "/reservation/:id",
  UserVerifyMiddleware.VerifyWaiter,
  ReservationController.DeleteReservation
);

module.exports = router;
