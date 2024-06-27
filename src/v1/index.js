const express = require("express");
const bodyParser = require("body-parser");
const connection = require("../data-access/database");
const helmet = require("helmet");

const app = express();
app.use(helmet());
// avoid being attacked by common HTTP
app.disable("x-powered-by");
// reduce fingerprints

//routes defines (to be seperated)
const userRoutes = require("./routes/userRoutes");

app.use(bodyParser.json());

app.use((req, res, next) => {
  if (req.url === "/" || req.url === "/api") {
    res.status(403).send("Redirects are not allowed");
  } else {
    next();
  }
});

app.use("/api/v1/user", userRoutes);

module.exports = app;
