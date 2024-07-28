const Reservation = require("../service/reservationServices");
const Location = require("../service/locationServices");
const DiningTable = require("../service/diningTableServices");

class ReservationController {
  static async CreateReservation(req, res) {
    const { tableID, reservationTime, specialRequests, status } = req.body;
    const userID = req.user.UserID;

    try {
      if (!tableID || !reservationTime || !status) {
        return res.status(400).json({ message: "Required fields are missing" });
      }

      const validStatus = ["Pending", "Confirmed", "Cancelled"];
      if (!validStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid Status" });
      }

      const now = new Date();
      const reservationDate = new Date(reservationTime);
      const oneWeekLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      if (isNaN(reservationDate.getTime())) {
        return res.status(400).json({ message: "Invalid reservation date" });
      }
      if (reservationDate < now) {
        return res
          .status(400)
          .json({ message: "Reservation time cannot be in the past" });
      }

      if (reservationDate > oneWeekLater) {
        return res.status(400).json({
          message: "Reservation time cannot be more than a week in advance",
        });
      }

      // const validateLocation = await Location.FindByID(locationID);
      // if (!validateLocation) {
      //   return res.status(400).json({ message: "Location does not exist" });
      // }

      const validateTable = await DiningTable.getDiningTableByID(tableID);
      if (!validateTable) {
        return res.status(400).json({ message: "Table does not exist" });
      }
      const locationID = validateTable.LocationID;
      if (!locationID) {
        console.error(
          "The table's location is not associated, there's an error in table's data in the DB or error while fetching data"
        );
        return res.status(500).json({ message: "Internal server error" });
      }
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
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async ViewReservationByID(req, res) {
    const { id: reservationID } = req.params;

    try {
      if (!reservationID) {
        return res.status(400).json({ message: "ReservationID is required" });
      }
      const reservation = await Reservation.GetReservationByID(reservationID);
      if (reservation) {
        return res.status(200).json({ reservation });
      } else {
        return res.status(404).json({ message: "Reservation not found" });
      }
    } catch (error) {
      console.error("Error in ViewReservationByID:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async ViewReservationsByLocationID(req, res) {
    const { id: locationID } = req.params;

    try {
      if (!locationID) {
        return res.status(400).json({ message: "LocationID is required" });
      }
      const reservations = await Reservation.GetReservationsByLocationID(
        locationID
      );
      return res.status(200).json({ reservations });
    } catch (error) {
      console.error("Error in ViewReservationsByLocationID:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateReservationStatus(req, res) {
    const { id: reservationID } = req.params;
    const { status } = req.body;

    try {
      if (!reservationID || !status) {
        return res
          .status(400)
          .json({ message: "ReservationID and status are required" });
      }
      const validStatus = ["Pending", "Confirmed", "Cancelled"];
      if (!validStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid Status" });
      }
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
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async DeleteReservation(req, res) {
    const { id: reservationID } = req.params;

    try {
      if (!reservationID) {
        return res.status(400).json({ message: "ReservationID is required" });
      }
      const success = await Reservation.DeleteReservation(reservationID);
      if (success) {
        return res
          .status(200)
          .json({ message: "Reservation deleted successfully" });
      } else {
        return res.status(404).json({
          message: "Reservation not found",
        });
      }
    } catch (error) {
      console.error("Error in DeleteReservation:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  static async GetReservationsByStatusAndLocationID(req, res) {
    const { status: status, id: locationID } = req.params;

    if (!status || !locationID) {
      return res
        .status(400)
        .json({ message: "Status and LocationID are required" });
    }

    const validStatus = ["Pending", "Confirmed", "Cancelled"];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid Status" });
    }

    try {
      const reservations =
        await Reservation.GetReservationsByStatusAndLocationID(
          status,
          locationID
        );
      return res.status(200).json({ reservations });
    } catch (error) {
      console.error("Error in GetReservationsByStatusAndLocationID:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = ReservationController;
