const dotenv = require('dotenv');

const { connectDb, disconnectDb } = require('../utils/connectDb');
const Sales = require('../models/salesModel');

dotenv.config({ path: '../config/dev.env' });

connectDb();

// Delete all sales documents
Sales.deleteMany({}, (err) => {
  if (err) console.error(err);
  console.log('successfully deleted all documents in sales collection');
  disconnectDb();
});
