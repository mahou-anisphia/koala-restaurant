const Location = require("../service/locationServices");

class LocationController {
  static async ViewAllLocation(req, res) {
    try {
      const locations = await Location.SelectAllLocation();
      return res.status(200).json(locations);
    } catch (error) {
      console.error("Error in get all Locations:", error);
      return res.status(500).json({ message: "Failed to fetch locations" });
    }
  }

  static async CreateLocation(req, res) {
    try {
      const { Address, City, State, ZipCode, Country } = req.body;
      if (!Address || !City || !State || !ZipCode || !Country) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newLocationId = await Location.CreateLocation({
        Address,
        City,
        State,
        ZipCode,
        Country,
      });

      return res
        .status(201)
        .json({ message: "Location created", locationID: newLocationId });
    } catch (error) {
      console.error("Error in create location:", error);
      return res.status(500).json({ message: "Failed to create location" });
    }
  }

  static async ViewLocation(req, res) {
    try {
      const locationId = req.params.id;
      if (!locationId) {
        return res.status(400).json({ message: "Location ID is required" });
      }

      const location = await Location.FindByID(locationId);
      if (!location) {
        return res.status(404).json({ message: "Location not found" });
      }

      return res.status(200).json(location);
    } catch (error) {
      console.error("Error in get location by ID:", error);
      return res
        .status(500)
        .json({ message: "Failed to get location details" });
    }
  }

  static async UpdateLocation(req, res) {
    try {
      const locationId = req.params.id;
      const { Address, City, State, ZipCode, Country } = req.body;

      if (!locationId || !Address || !City || !State || !ZipCode || !Country) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const updated = await Location.UpdateLocation(locationId, {
        Address,
        City,
        State,
        ZipCode,
        Country,
      });

      if (!updated) {
        return res.status(404).json({ message: "Location not found" });
      }

      return res.status(200).json({ message: "Location updated" });
    } catch (error) {
      console.error("Error in update location:", error);
      return res.status(500).json({ message: "Failed to update location" });
    }
  }

  static async DeleteLocation(req, res) {
    try {
      const locationId = req.params.id;
      if (!locationId) {
        return res.status(400).json({ message: "Location ID is required" });
      }

      const deleted = await Location.DeleteLocation(locationId);
      if (!deleted) {
        return res.status(404).json({ message: "Location not found" });
      }

      return res.status(200).json({ message: "Location deleted" });
    } catch (error) {
      console.error("Error in delete location:", error);
      return res.status(500).json({ message: "Failed to delete location" });
    }
  }
  static async SearchLocation(req, res) {
    const term = req.params.searchQueries;
    try {
      const result = await Location.SearchLocations(term);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error Search Occured", error);
      return res
        .status(500)
        .json({ error: "An error occurred while searching for user." });
    }
  }
}

module.exports = LocationController;
