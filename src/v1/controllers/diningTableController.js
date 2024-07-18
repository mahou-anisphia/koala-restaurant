const DiningTable = require("../service/diningTableServices");
const Location = require("../service/locationServices");
const Reservation = require("../service/reservationServices");

class DiningTableController {
  static async CreateTable(req, res) {
    try {
      const userID = req.user.UserID;
      const { capacity, location, locationID } = req.body;
      if (!capacity || !location || !locationID) {
        return res.status(400).json({ message: "Input missing fields!" });
      }
      const validateLocation = await Location.FindByID(locationID);
      if (!validateLocation) {
        return res.status(404).json({ message: "Invalid location!" });
      }
      const tableID = await DiningTable.createDiningTable(
        capacity,
        location,
        locationID,
        userID
      );
      res
        .status(201)
        .json({ message: "Dining table created successfully", tableID });
    } catch (error) {
      console.error("Error create dining table:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async GetByID(req, res) {
    try {
      const tableID = req.params.id;
      if (!tableID) {
        return res.status(400).json({ message: "TableID is required" });
      }
      const table = await DiningTable.getDiningTableByID(tableID);
      if (!table) {
        return res.status(404).json({ message: "Dining table not found" });
      }
      res.status(200).json(table);
    } catch (error) {
      console.error("Error getbyID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async UpdateTable(req, res) {
    try {
      const userID = req.user.UserID;
      const { capacity, location } = req.body;
      const tableID = req.params.id;
      if (!tableID) {
        return res.status(400).json({ message: "TableID is required" });
      }
      const presetTable = await DiningTable.getDiningTableByID(tableID);
      if (!presetTable) {
        return res.status(404).json({ message: "Table not found" });
      }
      // ensure no null input entered
      presetTable.capacity = capacity || presetTable.Capacity;
      presetTable.location = location || presetTable.Location;
      // modify a table to another location is not necessary
      // presetTable.locationID = locationID || presetTable.LocationID;
      const affectedRows = await DiningTable.updateDiningTable(
        tableID,
        presetTable.capacity,
        presetTable.location,
        presetTable.locationID,
        userID
      );
      if (affectedRows === 0) {
        console.error("table's data in the DB is modified during execution");
        res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({ message: "Dining table updated successfully" });
    } catch (error) {
      console.error("Error update dining table:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async DeleteTable(req, res) {
    const tableID = req.params.id;
    try {
      const reservation = await Reservation.GetReservationsByTableID(tableID);
      if (reservation.length > 0) {
        return res.status(400).json({
          message:
            "All reservation associated with the table must be deleted first",
        });
      }
      const validate = await DiningTable.deleteDiningTable(tableID);
      if (validate) {
        return res.status(200).json({ message: "Table deleted successfully" });
      }
      console.error(
        "table data is modified during execution, cause unexpected error"
      );
      return res.status(500).json({ message: "Internal server error" });
    } catch (error) {
      console.error("Error delete table:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async GetByLocationID(req, res) {
    try {
      const locationID = req.params.id;
      if (!locationID) {
        return res.status(400).json({ message: "LocationID is required!" });
      }
      const tables = await DiningTable.getDiningTableByLocationID(locationID);
      res.status(200).json(tables);
    } catch (error) {
      console.error("Error get by locationID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = DiningTableController;
