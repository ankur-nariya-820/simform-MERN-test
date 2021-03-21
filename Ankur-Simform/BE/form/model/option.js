"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OptionSchema = new Schema({
  question: {
    type: Schema.Types.ObjectId,
    ref: 'question'
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Number,
    default: Date.now
  },
});

const options = mongoose.model("option", OptionSchema);
module.exports = options;
