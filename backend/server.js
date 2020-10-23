const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const httpLogger = require("morgan");
const router = require("./api/router");
const appLogger = require("./logging/logger");

const isProduction = process.env.NODE_ENV === "production";
const isTest = process.env.NODE_ENV === "test";

const app = express();
const port = process.env.PORT || 5000;

app.use(httpLogger("combined", { stream: appLogger.stream }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (!isTest) {
  app.listen(port, () => appLogger.info(`Listening on port ${port}`));
}

app.use("/api", router);

if (isProduction) {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
}

module.exports = app;
