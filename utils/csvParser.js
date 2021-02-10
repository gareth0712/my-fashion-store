const {
  validateGender,
  validateNumber,
  validateLastPurchaseDate,
} = require('./validator');

module.exports = (csvString, i) => {
  const json = {};
  const csvArray = csvString.split(',');
  json.userName = csvArray[0].trim();
  json.age = validateNumber('AGE', csvArray[1], i, 130);
  json.height = validateNumber('HEIGHT', csvArray[2], i, 300);
  json.gender = validateGender(csvArray[3], i);
  json.saleAmount = validateNumber('SALE_AMOUNT', csvArray[4], i);
  json.lastPurchaseDate = validateLastPurchaseDate(csvArray[5], i);
  return json;
};
