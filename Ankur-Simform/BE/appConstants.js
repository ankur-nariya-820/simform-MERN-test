"use strict";

const Constant = {
  port: 4000,
  dbUrl: "mongodb://127.0.0.1:27017/form-builder",
  webUrl: 'http://localhost:3000/forms/',

  errors: {
    internalServerMsg: "Internal Server Error",
    mongooseErrorMsg: "Connection failed with - ",
  },

  answerTypes: {
    text: 'Text',
    checkboxes: 'Multichoice Checkbox',
    radio: 'Single Select radio'
  },

  errorCodes: {
    addFormValidation: 4001,
    listFormsValidation: 4002,
    getFormValidation: 4003,
    submitFormValidation: 4004,
    addFormServerError: 5002,
    listFormServerError: 5003,
    getFormServerError: 5004,
    submitFormServerError: 5005,
    formNotFound: 4041,
    questionsNotFound: 4042
  }
};

module.exports = Constant;
