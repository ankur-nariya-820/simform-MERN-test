"use strict";

const model = require("../model/form");

exports.addForm = addForm;
exports.getForm = getForm;
exports.removeFormById = removeFormById;
exports.updateResponseCount = updateResponseCount;
exports.list = list;
exports.total = total;

async function addForm(form) {
  try {
    let tempForm = new model(form);
    const formInfo = await tempForm.save();
    return {
      success: true,
      formInfo
    };
  } catch (e) {
    console.error("Error adding form", e);
    return {
      success: false
    }
  }
}

async function list(params) {
  try {
    const { page_number, limit, sort, sort_order } = params
    const skip = (page_number - 1) * limit
    const sortObj = {
      [sort]: sort_order
    }

    const forms = await model.find().skip(skip).limit(limit).sort(sortObj).lean()

    return {
      success: true,
      forms
    }
  } catch (e) {
    console.error("Error occured in list forms", e);
    return {
      success: false
    }
  }
}

async function total() {
  try {
    const total = await model.find().countDocuments()
    return {
      total
    }
  } catch (e) {
    console.error("Error occured in total forms", e);
    return {
      total: 0
    }
  }
}

async function getForm(formAccessToken) {
  try {
    const form = await model.findOne({ formAccessToken }).lean()
    return {
      success: true,
      form
    }
  } catch (e) {
    console.error("Error occured in get form", e);
    return {
      success: false
    }
  }
}

async function updateResponseCount(formId, updatedCount) {
  try {
    await model.updateOne({ _id: formId }, { responses: updatedCount, updatedAt: new Date().getTime() })
    return {
      updated: true
    }
  } catch (e) {
    console.error("Error occured in update form", e);
    return {
      updated: false
    }
  }
}

async function removeFormById(formId) {
  try {
    await model.deleteOne({ _id: formId })
    return {
      removed: true
    }
  } catch (e) {
    console.error("Error removing form", e);
    return {
      removed: false
    }
  }
}
