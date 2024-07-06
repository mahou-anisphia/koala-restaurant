const express = require("express");
const DiningTableController = require("../controllers/diningTableController");
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");
const router = express.Router();

// Route to create a new dining table
router.post(
  "/table",
  UserVerifyMiddleware.VerifyWaiter,
  DiningTableController.CreateTable
);

// Route to get a dining table by ID
router.get("/table/:id", DiningTableController.GetByID);

// Route to update a dining table
router.put(
  "/table/:id",
  UserVerifyMiddleware.VerifyWaiter,
  DiningTableController.UpdateTable
);

// Route to delete a dining table (not implemented)
router.delete(
  "/table/:id",
  UserVerifyMiddleware.VerifyWaiter,
  DiningTableController.DeleteTable
);

// Route to get dining tables by location ID
router.get("/table/location/:id", DiningTableController.GetByLocationID);

module.exports = router;
