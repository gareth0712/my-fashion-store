const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Sales = require('../models/salesModel');

dotenv.config({ path: '../config/dev.env' });

let DB;
if (process.env.NODE_ENV === 'development') {
  DB = process.env.DATABASE_DEV;
} else {
  DB = process.env.DATABASE;
}

DB = DB.replace('<DB_PORT>', process.env.DB_PORT);

// Database connection
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Delete all sales documents
Sales.deleteMany({}, (err) => {
  if (err) console.error(err);
  console.log('successfully deleted all documents in sales collection');
  mongoose.disconnect();
});
