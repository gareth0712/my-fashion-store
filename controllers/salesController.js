const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Sales = require('../models/salesModel');
const insert = require('../utils/insert');

exports.getAllSalesReports = catchAsync(async (req, res, next) => {
  // If no req.query given by user, return all records
  let message;
  let query = {};

  // Check whether user provides startDate and whether it is in valid date format
  if (req.query?.startDate && Date.parse(req.query.startDate) > 0)
    query.lastPurchaseDate = { $gte: new Date(req.query.startDate) };
  if (req.query?.endDate && Date.parse(req.query.endDate) > 0) {
    if (query.lastPurchaseDate) {
      query.lastPurchaseDate['$lt'] = new Date(req.query.endDate);
    } else {
      query.lastPurchaseDate = { $lt: new Date(req.query.endDate) };
    }
  }

  // Sample for the complete query: await sales.find({ "lastPurchaseDate": { "$gte": startDate, "$lt": endDate }})
  const numQueriedResults = await Sales.countDocuments(query);
  // Display a maximum of 10,000 JSONs only to avoid memory issue
  if (numQueriedResults > 10000)
    message =
      'Number of queried records exceeds 10,000 , will display a maximum of 10,000 records in JSON only';
  const sales = await Sales.find(query).limit(10000);

  res.status(200).json({
    status: 'success',
    queriedResults: numQueriedResults,
    message,
    dataDisplayed: sales.length,
    data: { sales },
  });
});

exports.uploadSalesRecord = catchAsync(async (req, res, next) => {
  // Using Optional Chaining prevents TypeError when req.body is undefined
  const filename = req.body?.path;

  if (!filename) {
    return next(
      new AppError(
        "Please provide a path for the CSV file with the key 'path'",
        404
      )
    );
  }

  const salesRecordsCount = await insert(filename);

  res.status(201).json({
    status: 'success',
    recordsAdded: salesRecordsCount,
  });
});
