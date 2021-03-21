"use strict";

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const FormSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  formAccessToken: {
    type: String,
  },
  responses: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Number,
    default: Date.now
  },
  updatedAt: {
    type: Number,
    default: Date.now
  },
});

const forms = mongoose.model("form", FormSchema);
module.exports = forms;
