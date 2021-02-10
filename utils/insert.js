const fs = require('fs');
const es = require('event-stream');

const csvParser = require('./csvParser');
const Sales = require('../models/salesModel');
const { validateCsvFile } = require('./validator');
const performanceMetrics = require('./performanceMetrics');

const salesRecordsStream = (path) => {
  let salesRecordsCount = 0;
  const results = [];
  performanceMetrics.start();

  // Make use of createReadStream for handling very big files
  return new Promise((resolve, reject) =>
    fs
      .createReadStream(path)
      .pipe(es.split()) // Split each line of the file
      .pipe(
        es.mapSync(async (line) => {
          // Skip first ilne or any empty line
          if (line.includes('USER_NAME') || line === '') return;
          results.push(csvParser(line));
          // set the chunked data to size of 50000 each
          if (results.length >= 50000) {
            const resultsToInsert = [...results];
            // Reset results array for memory concern
            results.length = 0;
            // Insert results by chunk of destinated size
            await Sales.insertMany(resultsToInsert);
            // Reset duplicated results array as well
            resultsToInsert.length = 0;
          }
          salesRecordsCount += 1;
        })
      )
      .on('error', (e) => reject(e))
      .on('end', async () => {
        // For adding last chunk of data of size below 50,000
        if (results.length > 0) await Sales.insertMany(results);
        if (process.env.NODE_ENV === 'development') {
          console.log(salesRecordsCount);
          // Performance metrics show runtime and memory used
          console.log(
            'Performance metrics:',
            performanceMetrics.showPerformanceData()
          );
        }
        resolve(salesRecordsCount);
      })
  );
};

module.exports = async (path) => {
  // Return error if there is problem with csv file
  await validateCsvFile(path);
  return await salesRecordsStream(path);
};
