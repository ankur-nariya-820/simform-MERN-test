"use strict";

require("express-async-errors");
const express = require("express");
const app = express();
const constants = require("./appConstants");

require("./startup/routes")(app);
require("./startup/db")();

process.on("uncaughtException", ex => {
  console.error("uncaughtException", ex);
});

process.on("unhandledRejection", ex => {
  console.error("unhandledRejection", ex);
});

const server = app.listen(constants.port, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log("app listening at http://%s:%s", host, port);
});
