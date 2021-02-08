const csvParser = require('./csvParser');
const Sales = require('../models/salesModel');
const { validateCsvFile } = require('./validator');
const performanceMetrics = require('./performanceMetrics');

module.exports = async (path) => {
  await validateCsvFile(path);
  let salesRecordsCount = 0;
  performanceMetrics.start();
  const data = await csvParser(path);
  await Sales.insertMany(data);
  salesRecordsCount += data.length;
  if (process.env.NODE_ENV === 'development') {
    console.log(
      'Performance metrics of Insert -',
      performanceMetrics.showPerformanceData()
    );
  }
  return salesRecordsCount;
};
