"use strict";

const model = require("../model/formSubmissions");

exports.submitForm = submitForm;

async function submitForm(response) {
  try {
    let tempResponse = new model(response);
    await tempResponse.save();
    return {
      success: true
    };
  } catch (e) {
    console.error("Error submitting form", e);
    return {
      success: false
    }
  }
}
