"use strict";

const model = require("../model/option");

exports.addOptions = addOptions;
exports.getOptions = getOptions;
exports.removeOptionsByQuestionId = removeOptionsByQuestionId;

async function addOptions(options) {
  try {
    await model.insertMany(options)
    return {
      success: true
    };
  } catch (e) {
    console.error("Error adding options", e);
    return {
      success: false
    }
  }
}

async function getOptions(questionId) {
  try {
    const options = await model.find({ question: questionId }).lean()
    return {
      success: true,
      options
    };
  } catch (e) {
    console.error("Error getting options", e);
    return {
      success: false
    }
  }
}

async function removeOptionsByQuestionId(questionId) {
  try {
    await model.deleteMany({ question: questionId })
    return {
      removed: true
    }
  } catch (e) {
    console.error("Error removing options", e);
    return {
      removed: false
    }
  }
}
