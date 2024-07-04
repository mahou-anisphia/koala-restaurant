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
const userRoutes = require("./v1/routes/userRoutes");
const ownerRoutes = require("./v1/routes/ownerRoutes");

app.use(bodyParser.json());

app.use((req, res, next) => {
  if (req.url === "/" || req.url === "/api" || req.url === "/api/v1") {
    res.status(403).send("Redirects are not allowed");
  } else {
    next();
  }
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/user/owner", ownerRoutes);

module.exports = app;
