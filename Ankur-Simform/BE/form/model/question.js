"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const constants = require('../../appConstants')

const QuestionSchema = new Schema({
  form: {
    type: Schema.Types.ObjectId,
    ref: 'form'
  },
  question: {
    type: String,
    required: true
  },
  answerType: {
    type: String,
    enum : constants.answerTypes,
    default: constants.answerTypes[0]
  },
  createdAt: {
    type: Number,
    default: Date.now
  },
});

const questions = mongoose.model("question", QuestionSchema);
module.exports = questions;
