const AppError = require('../utils/AppError');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

module.exports = (err, req, res, next) => {
  // In case invalid JSON body, e.g. "abc" as json req body, is provided
  if (err.type === 'entity.parse.failed')
    err.message = `Found invalid JSON in request body. Please provide valid JSON in '{ "path": "csv/csvfile" }' format `;

  // Could be errors without statusCode / status or not created by us (e.g. error from mongodb)
  // => Set it to 500 in case error without status code
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    // In dev, we want to produce as much info as possible to trace error
    sendErrorDev(err, res);
  }
};
