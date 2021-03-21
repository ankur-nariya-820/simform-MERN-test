"use strict";

const model = require("../model/question");

exports.addQuestion = addQuestion;
exports.getQuestions = getQuestions;
exports.removeQuestionsByFormId = removeQuestionsByFormId;

async function addQuestion(question) {
  try {
    let tempQuestion = new model(question);
    const questionInfo = await tempQuestion.save();
    return {
      success: true,
      questionInfo
    };
  } catch (e) {
    console.error("Error adding question", e);
    return {
      success: false
    }
  }
}

async function getQuestions(formId) {
  try {
    const questions = await model.find({ form: formId }).lean()
    return {
      success: true,
      questions
    };
  } catch (e) {
    console.error("Error getting questions", e);
    return {
      success: false
    }
  }
}

async function removeQuestionsByFormId(formId) {
  try {
    await model.deleteMany({ form: formId })
    return {
      removed: true
    }
  } catch (e) {
    console.error("Error removing questions", e);
    return {
      removed: false
    }
  }
}

