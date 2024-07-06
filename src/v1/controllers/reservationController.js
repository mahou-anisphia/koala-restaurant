const Reservation = require("../service/reservationServices");
const Location = require("../service/locationServices");
const DiningTable = require("../service/diningTableServices");

class ReservationController {
  static async CreateReservation(req, res) {
    const { tableID, reservationTime, specialRequests, status, locationID } =
      req.body;
    const userID = req.user.UserID;

    if (!tableID || !reservationTime || !status || !locationID) {
      return res.status(400).json({ message: "Required fields are missing" });
    }
    const validStatus = ["Pending", "Confirmed", "Cancelled"];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid Status" });
    }
    const validateLocation = await Location.FindByID(locationID);
    if (!validateLocation) {
      return res.status(400).json({ message: "Location does not exist" });
    }
    const validateTable = await DiningTable.getDiningTableByID(tableID);
    if (!validateTable) {
      return res.status(400).json({ message: "Table does not exist" });
    }
    try {
      const reservationID = await Reservation.CreateReservation(
        userID,
        tableID,
        reservationTime,
        specialRequests,
        status,
        locationID
      );
      return res.status(201).json({
        message: "Reservation created successfully",
        ReservationID: reservationID,
      });
    } catch (error) {
      console.error("Error in CreateReservation:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async ViewReservationByID(req, res) {
    const { id: reservationID } = req.params;
    if (!reservationID) {
      return res.status(400).json({ message: "ReservationID is required" });
    }

    try {
      const reservation = await Reservation.GetReservationByID(reservationID);
      if (reservation) {
        return res.status(200).json({ reservation });
      } else {
        return res.status(404).json({ message: "Reservation not found" });
      }
    } catch (error) {
      console.error("Error in ViewReservationByID:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async ViewReservationsByLocationID(req, res) {
    const { locationID } = req.params;
    if (!locationID) {
      return res.status(400).json({ message: "LocationID is required" });
    }

    try {
      const reservations = await Reservation.GetReservationsByLocationID(
        locationID
      );
      return res.status(200).json({ reservations });
    } catch (error) {
      console.error("Error in ViewReservationsByLocationID:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async UpdateReservationStatus(req, res) {
    const { id: reservationID } = req.params;
    const { status } = req.body;

    if (!reservationID || !status) {
      return res
        .status(400)
        .json({ message: "ReservationID and status are required" });
    }
    const validStatus = ["Pending", "Confirmed", "Cancelled"];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid Status" });
    }
    try {
      const success = await Reservation.UpdateReservationStatus(
        reservationID,
        status
      );
      if (success) {
        return res
          .status(200)
          .json({ message: "Reservation status updated successfully" });
      } else {
        return res.status(404).json({ message: "Reservation not found" });
      }
    } catch (error) {
      console.error("Error in UpdateReservationStatus:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async DeleteReservation(req, res) {
    const { id: reservationID } = req.params;
    if (!reservationID) {
      return res.status(400).json({ message: "ReservationID is required" });
    }

    try {
      const success = await Reservation.DeleteReservation(reservationID);
      if (success) {
        return res
          .status(200)
          .json({ message: "Reservation deleted successfully" });
      } else {
        return res.status(404).json({ message: "Reservation not found" });
      }
    } catch (error) {
      console.error("Error in DeleteReservation:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = ReservationController;
