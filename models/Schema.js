const mongoose = require('mongoose');

// const IDSchema = mongoose.Schema({
//   uuid: [String],
// });

// const ContactInfoSchema = mongoose.Schema({
//   uuid: [String],
// });

// const CustomerSchema = mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   company: String,
//   connectInfo: ContactInfoSchema,
// });


const EmailSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  content: { 
    type: String
  },
  title: {
    type: String
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

const Email = mongoose.model('email', EmailSchema);

module.exports = Email;
