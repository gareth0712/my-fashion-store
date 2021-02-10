const dotenv = require('dotenv');

if (process.env.DOCKER === 'TRUE') {
  dotenv.config({ path: './config/docker-dev.env' });
} else {
  dotenv.config({ path: './config/dev.env' });
}

// Both app and connectDb need to make use of env var
const app = require('./app');
const { connectDb } = require('./utils/connectDb');

connectDb();

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
