const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Email = mongoose.model('email', EmailSchema);
