const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./data-access/database");
const helmet = require("helmet");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Express API for Koala Restaurant",
    version: "1.0.0",
    description:
      "This is a REST API application made with Express. It retrieves data from AWS RDS, and interract with Amazon S3.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    // contact: {
    //   name: 'JSONPlaceholder',
    //   url: 'https://jsonplaceholder.typicode.com',
    // },
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
    {
      url: "https://koala-restaurant.vercel.app/",
      description: "Production server",
    },
  ],
};

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
const app = express();
app.use(helmet());
app.use(cors());
// avoid being attacked by common HTTP
app.disable("x-powered-by");
// reduce fingerprints
const options = {
  swaggerDefinition,
  // Path to the API docs
  apis: ["./src/v1/routes/**.js"], // files containing annotations as above
};
//routes defines (to be seperated)
const devRoutes = require("./v1/routes/devRoutes");
const userRoutes = require("./v1/routes/userRoutes");
const ownerRoutes = require("./v1/routes/ownerRoutes");
const dishRoutes = require("./v1/routes/dishRoutes");
const locationRoutes = require("./v1/routes/locationRoutes");
const menuRoutes = require("./v1/routes/menuRoutes");
const categoryRoutes = require("./v1/routes/categoryRoutes");
const diningTableRoutes = require("./v1/routes/diningTableRoutes");
const reservationRoutes = require("./v1/routes/reservationRoutes");
const orderRoutes = require("./v1/routes/orderRoutes");

app.use(bodyParser.json());

const swaggerSpec = swaggerJSDoc(options);

app.use((req, res, next) => {
  if (req.url === "/api/v1") {
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
app.use("/api/v1/", menuRoutes);
app.use("/api/v1/", categoryRoutes);
app.use("/api/v1/", diningTableRoutes);
app.use("/api/v1/", reservationRoutes);
app.use("/api/v1/", orderRoutes);
app.use(
  "/api/docs",
  express.static(path.join(__dirname, "node_modules/swagger-ui-dist"))
);
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss:
      ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
    customCssUrl: CSS_URL,
  })
);

module.exports = app;
