const express = require("express");
const LocationController = require("../controllers/locationController");
const UserVerifyMiddleware = require("../middleware/UserVerifyMiddleware");
const router = express.Router();

router.post("/location/", LocationController.ViewAllLocation);
router.post(
  "/location/search/:searchQueries",
  LocationController.ViewAllLocation
);

router.get("/location/:id", LocationController.ViewLocation);
router.post(
  "/location/",
  UserVerifyMiddleware.VerifyOwner,
  LocationController.CreateLocation
);
router.patch(
  "/location/:id",
  UserVerifyMiddleware.VerifyOwner,
  LocationController.UpdateLocation
);
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