const { validationResult } = require("express-validator");
const logger = require("../../logging/logger");

const VALIDATION_ERROR_STATUS_CODE = 422;

function defineValidator(chain) {
  return [chain, handleInputValidation];
}

function handleInputValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    logger.warn("Error validating API input", errors);
    const error = new Error("Invalid input");
    error.outputMessage = "Invalid input";
    error.status = VALIDATION_ERROR_STATUS_CODE;
    error.details = { errors: errors.array() };
    return next(error);
  }
  next();
}

module.exports = { defineValidator };
