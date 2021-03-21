"use strict";

const constants = require("../../appConstants");
const utils = require("../../utils");

const addFormValidation = (req, res, next) => {
  try {
    const { name, questions } = req.body
    let hasError = false;

    if (!name || !questions || questions.length <= 0) {
      hasError = true
    } else {
      const isQueTypesValid = questions.every(que => Object.values(constants.answerTypes).includes(que.answerType))
      let isQueOptionsValid = true
      for (let i = 0; i < questions.length; i++) {
        const que = questions[0]
        if (que.answerType === constants.answerTypes.checkboxes && que.options.length <= 0) {
          isQueOptionsValid = false;
          break;
        }
        if (que.answerType === constants.answerTypes.radio && que.options.length <= 0) {
          isQueOptionsValid = false;
          break;
        }
      }

      if (!isQueTypesValid || !isQueOptionsValid) {
        hasError = true
      }
    }

    if (hasError) {
      return utils.sendError(res, 400, constants.errorCodes.addFormValidation)
    } else {
      next();
    }

  } catch (e) {
    return utils.sendError(res)
  }
}

const listFormsValidation = (req, res, next) => {
  try {
    const { page_number, limit, sort, sort_order } = req.query
    let hasError = false;
    if (page_number && page_number <= 0) {
      hasError = true

    } else if (limit && (limit <= 0 || limit >= 100)) {
      hasError = true
    } else if (sort_order && sort_order !== 'ASC' && sort_order !== 'DESC') {
      hasError = true
    } else if (sort && sort !== 'name' && sort !== 'createdAt') {
      hasError = true
    }

    if (hasError) {
      return utils.sendError(res, 400, constants.errorCodes.listFormsValidation)
    } else {
      next();
    }
  } catch (e) {
    return utils.sendError(res)
  }
}

const getFormValidation = (req, res, next) => {
  try {
    const { formAccessToken } = req.query
    let hasError = false;

    if (!formAccessToken) {
      hasError = true
    }

    if (hasError) {
      return utils.sendError(res, 400, constants.errorCodes.addFormValidation)
    } else {
      next();
    }

  } catch (e) {
    return utils.sendError(res)
  }
}

const submitFormValidation = (req, res, next) => {
  try {
    const { formAccessToken, response } = req.body
    let hasError = false;

    if (!formAccessToken || !response || response.length <= 0) {
      hasError = true
    } else {
      response.forEach(item => {
        if(!item.question) {
          hasError = true
        } else if(!item.option && !item.text) {
          hasError = true
        }
      })
    }

    if (hasError) {
      return utils.sendError(res, 400, constants.errorCodes.submitFormValidation)
    } else {
      next();
    }

  } catch (e) {
    return utils.sendError(res)
  }
}

exports.addFormValidation = addFormValidation;
exports.listFormsValidation = listFormsValidation;
exports.getFormValidation = getFormValidation;
exports.submitFormValidation = submitFormValidation;
