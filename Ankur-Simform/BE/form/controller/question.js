"use strict";

const dao = require("../dao/question");
const formDao = require("../dao/form");
const optionsDao = require("../dao/option");
const constants = require("../../appConstants")

exports.addQuestions = addQuestions;
exports.getQuestions = getQuestions;

const createOptions = (options, questionId) => {
  const optionsToInsert = options.map(option => {
    return {
      question: questionId,
      text: option,
      createdAt: new Date().getTime()
    }
  })
  return optionsToInsert
}

async function addQuestions(questions, formId) {
  return Promise.all(questions.map(async questionObj => {
    const { answerType, options, question } = questionObj;

    const questionDBObj = {
      form: formId,
      question,
      answerType,
      createdAt: new Date().getTime()
    }
    const { success, questionInfo } = await dao.addQuestion(questionDBObj)

    if (success) {
      if (answerType !== constants.answerTypes.text) {
        const optionsToInsert = createOptions(options, questionInfo._id)
        const addOptions = await optionsDao.addOptions(optionsToInsert)
        if (!addOptions.success) {
          await formDao.removeFormById(formId)
          await dao.removeQuestionsByFormId(formId)
          throw new Error('Error occured in adding options')
        }
      }
    } else {
      await formDao.removeFormById(formId)
      throw new Error('Error occured in adding questions')
    }
  }))
    .then(() => {
      return {
        added: true
      }
    })
    .catch((e) => {
      console.log("Error adding questions/options", e)
      return {
        added: false
      }
    })
}

async function getQuestions(formId) {
  const { success, questions } = await dao.getQuestions(formId)

  if (questions && questions.length > 0) {
    return Promise.all(questions.map(async questionObj => {
      if (questionObj.answerType !== constants.answerTypes.text) {
        const { success, options } = await optionsDao.getOptions(questionObj._id)

        if (!success || !options || options.length <= 0) {
          throw new Error('No questions found')
        } else {
          questionObj.options = options
          return questionObj
        }
      } else {
        questionObj.options = []
        return questionObj
      }
    }))
      .then((questions) => {
        return {
          found: true,
          questions
        }
      })
      .catch((e) => {
        return {
          found: false
        }
      })
  } else {
    return {
      found: false
    }
  }
}
