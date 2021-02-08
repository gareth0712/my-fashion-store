const path = require('path');
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const salesRouter = require('./routes/salesRoutes');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// 1) GLOBAL Middlewares
// For dev logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body and store into req.body
// and limit the req body to 10kb or it will reject the request body
app.use(express.json({ limit: '10kb' }));

// 2) Routes
// We want to use the middleware for this specific route "/sales"
// For testing connection
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
  });
});
// APIs for Sales are routed using salesRouter
app.use('/sales', salesRouter);

// Attempt to access any other undefined endpoints will return a 404 response
app.all('*', (req, res, next) => {
  // Express assumes everything we pass to next() is an error
  // and will ignore other middlewares in the middleware stack and send the error that we pass in to the global error handling middleware at last
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 3) Global error handling middleware
// By specifying the arguments with first as err, Express knows this entire function is error handling middleware
app.use(globalErrorHandler);

// 4) Start server in server.js
module.exports = app;
