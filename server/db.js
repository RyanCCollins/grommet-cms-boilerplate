import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import env from 'node-env-file';
import path from 'path';
import { initScript } from './utils/init-script';

// Load environment variables
env(path.join(__dirname, '..', '.env'));

// Connection string
const getDbUri = (dbName) => {
  if (dbName)
    return `mongodb://localhost:27017/${dbName}`;
  else 
    console.log('A database must be specified in the .env.');
    process.exit();
};

const dbOptions = {
  user: process.env.DB_USER,
  pass: process.env.DB_PW
};

// Create the database connection
const connection = mongoose.connect(getDbUri(process.env.DB), dbOptions);
autoIncrement.initialize(connection);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + getDbUri(process.env.DB));
  initScript();
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
