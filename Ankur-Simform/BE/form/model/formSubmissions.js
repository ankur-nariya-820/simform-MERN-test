"use strict";

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const FormSubmissionSchema = new Schema({
  form: {
    type: Schema.Types.ObjectId,
    ref: 'form'
  },
  response: [{
    question: {
      type: Schema.Types.ObjectId,
      ref: 'question'
    },
    option: {
      type: Schema.Types.ObjectId,
      ref: 'option'
    },
    options: [{
      type: Schema.Types.ObjectId,
      ref: 'option'
    }],
    text: String
  }],
  createaAt: {
    type: Number,
    default: Date.now
  },
});

const formSubmissions = mongoose.model("formSubmission", FormSubmissionSchema);
module.exports = formSubmissions;
