const mongoose = require('mongoose');
const dotenv = require('dotenv');

if (process.env.DOCKER === 'TRUE') {
  dotenv.config({ path: './config/docker.env' });
} else {
  dotenv.config({ path: './config/dev.env' });
}
const app = require('./app');

let DB;
if (process.env.NODE_ENV === 'development') {
  DB = process.env.DATABASE_DEV;
} else {
  DB = process.env.DATABASE;
}

DB = DB.replace('<DB_PORT>', process.env.DB_PORT);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((e) => console.log(`Error connecting to database: ${e}`));

const port = process.env.PORT || 8081;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
