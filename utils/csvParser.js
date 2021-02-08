const fs = require('fs').promises;

const {
  validateGender,
  validateNumber,
  validateLastPurchaseDate,
} = require('./validator');
const performanceMetrics = require('./performanceMetrics');

performanceMetrics.start();

module.exports = async (filePath) => {
  const data = await fs.readFile(filePath, 'binary');
  const jsonArray = [];
  const arr = data.split('\r\n');

  // Remove header
  arr.shift();
  // Remove last empty row if any
  while (arr[arr.length - 1] === '') {
    arr.pop();
  }

  arr.forEach((el, i) => {
    const tempJson = {};
    const temp = el.split(',');
    tempJson.userName = temp[0].trim();
    tempJson.age = validateNumber('AGE', temp[1], i, 130);
    tempJson.height = validateNumber('HEIGHT', temp[2], i, 300);
    tempJson.gender = validateGender(temp[3], i);
    tempJson.saleAmount = validateNumber('SALE_AMOUNT', temp[4], i);
    tempJson.lastPurchaseDate = validateLastPurchaseDate(temp[5], i);

    jsonArray.push(tempJson);
  });
  if (process.env.NODE_ENV === 'development') {
    console.log(
      'Performance metrics of Parse -',
      performanceMetrics.showPerformanceData()
    );
  }
  return jsonArray;
};
