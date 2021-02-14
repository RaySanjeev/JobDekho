const dotenv = require('dotenv');
const mongoose = require('mongoose');

// HANDLING ANY OTHER ASYNC ERRORS
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting Dowm.....');
  console.log(err.name, err.message);
  process.exit(1);
});

// READING ENVIRONMENT VARIABLES
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connection successfull!'));

// REQUIRE THE APP
const app = require('./app');

// STARTING THE SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});

// HANDLING PROMISE REJECETION
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥. Shutting Down.');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
