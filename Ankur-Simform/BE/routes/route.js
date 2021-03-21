"use strict";

const express = require("express");
const router = express.Router();

// Validators
const formValidation = require("./../middlewares/validations/form")

// Controllers
const formController = require("./../form/controller/form");

router.post("/forms", formValidation.addFormValidation, formController.addForm);
router.get("/forms", formValidation.listFormsValidation, formController.list);
router.get("/form", formValidation.getFormValidation, formController.getForm);
router.post("/form", formValidation.submitFormValidation, formController.submitForm);

module.exports = router;
