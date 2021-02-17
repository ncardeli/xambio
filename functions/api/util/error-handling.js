function errorHandler(error, req, res, next) {
  if (error.response) {
    error.status = error.response.status;
    error.outputMessage = error.response.data.message;
  }
  next(error);
}

module.exports = errorHandler;
