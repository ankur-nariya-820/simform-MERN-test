const express = require("express");
const cors = require("cors");
const routes = require("./../routes/route");
const error = require("../middlewares/error");

module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  var router = express.Router();
  app.use("/api", router);
  app.use("/api", routes);

  app.use(error);
};