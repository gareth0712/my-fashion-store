const supertest = require('supertest');
const mongoose = require('mongoose');

const Sales = require('../models/salesModel');
const app = require('../app');

const request = supertest(app);

beforeAll(() => {
  const DB = 'mongodb://localhost:27031/my-fashion-store-dev';
  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('DB connection successful!'))
    .catch((e) => console.log(`Error connecting to database: ${e}`));
});

afterAll(() => {
  console.log('end of test');
  mongoose.disconnect();
});

beforeEach(async () => {
  // Ensure no records are in database
  await Sales.deleteMany({}, (err) => {});
});

test('Should connect to server', async () => {
  await request.get('/').expect(200);
});

test('Should receive sales report of 0 record at the beginning', async () => {
  const reports = await request.get('/sales/report').expect(200);
  expect(reports.body.results).toBe(0);
});

test('Should insert 10 records upon a ordinary csv files with 10 records is provided', async () => {
  const addedSales = await request
    .post('/sales/record')
    .send({
      path: 'csv/validation/sales-10rows.csv',
    })
    .expect(201);
  expect(addedSales.body.recordsAdded).toBe(10);
});

test('Should insert successfully although all fields except LAST_PURCHASE_DATE are empty', async () => {
  const addedSales = await request
    .post('/sales/record')
    .send({
      path: 'csv/validation/sales-empty-except-last-purchase-date.csv',
    })
    .expect(201);
  expect(addedSales.body.recordsAdded).toBe(5);
});

test('Should return 10 reports from /sales/report after 10 sales record are added', async () => {
  const addedSales = await request
    .post('/sales/record')
    .send({
      path: 'csv/validation/sales-10rows.csv',
    })
    .expect(201);
  expect(addedSales.body.recordsAdded).toBe(10);
  const reports = await request.get('/sales/report').expect(200);
  expect(reports.body.results).toBe(10);
});

test('Test startDate: Should return 7 reports from /sales/report with LAST_PURCHASE_DATE after 2020', async () => {
  const addedSales = await request
    .post('/sales/record')
    .send({
      path: 'csv/validation/sales-10rows-7-after-2020-3-before-2020.csv',
    })
    .expect(201);
  expect(addedSales.body.recordsAdded).toBe(10);
  const reports = await request.get('/sales/report').expect(200);
  expect(reports.body.results).toBe(10);
  const reportsSince2020 = await request
    .get('/sales/report')
    .query({ startDate: '2020-01-01' })
    .expect(200);
  expect(reportsSince2020.body.results).toBe(7);
});

test('Test endDate: Should return 6 reports from /sales/report with LAST_PURCHASE_DATE before 2020', async () => {
  const addedSales = await request
    .post('/sales/record')
    .send({
      path: 'csv/validation/sales-10rows-4-after-2020-6-before-2020.csv',
    })
    .expect(201);
  expect(addedSales.body.recordsAdded).toBe(10);
  const reports = await request.get('/sales/report').expect(200);
  expect(reports.body.results).toBe(10);
  const reportsSince2020 = await request
    .get('/sales/report')
    .query({ endDate: '2020-01-01' })
    .expect(200);
  expect(reportsSince2020.body.results).toBe(6);
});

test('Test Date Range: Should return 5 reports from /sales/report with LAST_PURCHASE_DATE in 2019', async () => {
  const addedSales = await request
    .post('/sales/record')
    .send({
      path: 'csv/validation/sales-15rows-5-in-2019.csv',
    })
    .expect(201);
  expect(addedSales.body.recordsAdded).toBe(15);
  const reports = await request.get('/sales/report').expect(200);
  expect(reports.body.results).toBe(15);
  const reportsIn2019 = await request
    .get('/sales/report')
    .query({ startDate: '2019-01-01', endDate: '2020-01-01' })
    .expect(200);
  expect(reportsIn2019.body.results).toBe(5);
});
