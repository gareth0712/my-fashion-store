const fs = require('fs');

const AppError = require('./AppError');

const validateCsvFile = async (path) => {
  if (!fs.existsSync(path))
    throw new AppError(
      `Please ensure the given file exists and ensure the path to file (${path}) is correct`,
      404
    );
};

const validateGender = (gender, index) => {
  if (['M', 'F'].includes(gender) || gender === '') return gender;
  if (['m', 'f'].includes(gender)) return gender.toUpperCase();
  const message = `Please provide valid input for GENDER ('M' or 'F') for record #${
    index + 1
  }`;
  throw new AppError(message, 400);
};

const validateNumber = (field, value, index, max = 0) => {
  let message;
  if (value === '') return value;
  if (value <= 0) {
    message = `${field} should not be negative number for record #${index + 1}`;
  } else if (max > 0 && value > max) {
    message = `${field} should not exceed ${max} for record #${index + 1}`;
  }
  if (message) throw new AppError(message, 400);
  return value;
};

const validateLastPurchaseDate = (date, index) => {
  if (date === '')
    throw new AppError(
      `LAST_PURCHASE_DATE should not be empty for record #${index + 1}`,
      400
    );
  const parsedDate = Date.parse(date);
  if (Number.isNaN(parsedDate) || parsedDate < 0 || parsedDate > Date.now())
    throw new AppError(
      `Please provide a valid date string in LAST_PURCHASE_DATE field for record ${
        index + 1
      }`,
      400
    );
  return new Date(date).toISOString();
};

module.exports = {
  validateCsvFile,
  validateGender,
  validateNumber,
  validateLastPurchaseDate,
};
