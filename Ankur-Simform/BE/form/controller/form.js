"use strict";

const dao = require("../dao/form");
const formSubmissionDao = require("../dao/formSubmission");
const constants = require("../../appConstants");
const utils = require("../../utils");
const { v4: uuidv4 } = require('uuid');
const questionsController = require("./question")

exports.addForm = addForm;
exports.list = list;
exports.getForm = getForm;
exports.submitForm = submitForm;

async function addForm(req, res) {
  try {
    const { name, questions } = req.body;
    const formAccessToken = uuidv4();
    const tempForm = {
      name,
      formAccessToken,
      responses: 0,
      createdAt: new Date().getTime()
    }
    const { success, formInfo } = await dao.addForm(tempForm)

    if (!success) {
      return utils.sendError(res, 500, constants.errorCodes.addFormServerError)
    }

    const { added } = await questionsController.addQuestions(questions, formInfo._id)

    if (!added) {
      return utils.sendError(res, 500, constants.errorCodes.addFormServerError)
    }

    return res.status(200).send()
  } catch (e) {
    return utils.sendError(res, 500, constants.errorCodes.addFormServerError)
  }
}

async function list(req, res) {
  try {
    const { page_number = 1, limit = 10, sort = 'name', sort_order = 'ASC' } = req.query
    const params = {
      page_number,
      limit: parseInt(limit),
      sort,
      sort_order: sort_order === 'ASC' ? 1 : -1
    }
    let { success, forms } = await dao.list(params)
    const { total } = await dao.total()

    if (!success) {
      return utils.sendError(res, 500, constants.errorCodes.listFormServerError)
    }

    forms = forms.map(form => {
      form.url = `${constants.webUrl}${form.formAccessToken}`
      return form
    })

    return res.status(200).send({
      forms,
      total
    })
  } catch (e) {
    return utils.sendError(res, 500, constants.errorCodes.listFormServerError)
  }
}

async function getForm(req, res) {
  try {
    const { formAccessToken } = req.query

    const { success, form } = await dao.getForm(formAccessToken)

    if (!success) {
      return utils.sendError(res, 500, constants.errorCodes.getFormServerError)
    }

    if (!form) {
      return utils.sendError(res, 404, constants.errorCodes.formNotFound)
    }

    const { found, questions } = await questionsController.getQuestions(form._id)

    if (!found) {
      return utils.sendError(res, 404, constants.errorCodes.questionsNotFound)
    }

    form.questions = questions

    return res.status(200).send({
      form,
    })
  } catch (e) {
    return utils.sendError(res, 500, constants.errorCodes.getFormServerError)
  }
}

async function submitForm(req, res) {
  try {
    let { formAccessToken, response } = req.body

    const { success, form } = await dao.getForm(formAccessToken)

    if (!success) {
      return utils.sendError(res, 500, constants.errorCodes.submitFormServerError)
    }

    if (!form) {
      return utils.sendError(res, 404, constants.errorCodes.formNotFound)
    }

    response = response.map(item => {
      if(item.option && Array.isArray(item.option)) {
        item.options = item.option
        delete item.option
        return item
      }
      return item
    })

    const responseObj = {
      form: form._id,
      response,
      createdAt: new Date().getTime()
    }

    await formSubmissionDao.submitForm(responseObj)
    await dao.updateResponseCount(form._id, form.responses + 1)
    return res.status(200).send()
  } catch (e) {
    return utils.sendError(res, 500, constants.errorCodes.submitFormServerError)
  }
}
