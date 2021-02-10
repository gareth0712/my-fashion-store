const mongoose = require('mongoose');

const connectDb = () => {
  const DB = process.env.DATABASE.replace('<DB_PORT>', process.env.DB_PORT);

  mongoose
    .connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('DB connection successful!'))
    .catch((e) => console.log(`Error connecting to database: ${e}`));
};

const disconnectDb = () => mongoose.disconnect();

module.exports = {
  connectDb,
  disconnectDb,
};
