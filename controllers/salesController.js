const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Sales = require('../models/salesModel');
const insert = require('../utils/insert');

exports.getAllSalesReports = catchAsync(async (req, res, next) => {
  // If no req.query given by user, return all records
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
  let sales = await Sales.find(query);

  res.status(200).json({
    status: 'success',
    results: sales.length,
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
