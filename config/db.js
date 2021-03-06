const mongoose = require('mongoose');
require("dotenv").config()

const connectDB = () => {
  return mongoose.connect(process.env.MONGODB_CONNECTION_STRING , {useNewUrlParser: true}, (err) => {
  // return mongoose.connect('mongodb://127.0.0.1:27017/main' , {useNewUrlParser: true}, (err) => {
      if (err) {
          console.error('Failed to connect to mongo on startup - retrying in 1 sec', err);
          setTimeout(connectDB, 1000);
      } else {
        console.log('MongoDB is Connected...');
      }
  });
};

module.exports = connectDB;
