"use strict";

const constants = require("../appConstants");

module.exports = function(err, req, res, next) {
  let log = {
    message: constants.errors.internalServerMsg,
    error: err.toString()
  };
  console.log("API error found", err)
  res.status(500).send(log);
};
