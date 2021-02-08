const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  userName: {
    type: String,
    trim: true,
  },
  age: {
    type: Number,
    min: [1, 'Age should never be negative'],
  },
  height: {
    type: Number,
    min: [1, 'height should never be negative'],
  },
  gender: {
    type: String,
    enum: ['M', 'F', ''],
  },
  saleAmount: {
    type: Number,
    min: [1, 'Sales amount should never be negative'],
  },
  lastPurchaseDate: {
    type: Date,
    required: [true, 'A sales record must have purchase date'],
  },
});

const Sales = mongoose.model('Sales', salesSchema);

module.exports = Sales;
