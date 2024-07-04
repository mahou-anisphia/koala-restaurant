const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./data-access/database");
const helmet = require("helmet");
const cors = require("cors");

const app = express();
app.use(helmet());
app.use(cors());
// avoid being attacked by common HTTP
app.disable("x-powered-by");
// reduce fingerprints

//routes defines (to be seperated)
const devRoutes = require("./v1/routes/devRoutes");
const userRoutes = require("./v1/routes/userRoutes");
const ownerRoutes = require("./v1/routes/ownerRoutes");
const dishRoutes = require("./v1/routes/dishRoutes");
const locationRoutes = require("./v1/routes/locationRoutes");

app.use(bodyParser.json());

app.use((req, res, next) => {
  if (req.url === "/" || req.url === "/api" || req.url === "/api/v1") {
    res.status(403).send("Redirects are not allowed");
  } else {
    next();
  }
});

app.use("/api/v1/", devRoutes);
app.use("/api/v1/", userRoutes);
app.use("/api/v1/", ownerRoutes);
app.use("/api/v1/", dishRoutes);
app.use("/api/v1/", locationRoutes);

module.exports = app;
