const mongoose = require('mongoose');
const User = require('./User');

const AuthorSchema = new mongoose.Schema({
  lname: {
    type: String,
    required: [true, 'Add last name.'],
    trim: true
  },
  fname: {
    type: String
  },
  dob: {
    type: Date
  },
  dod: {
    type: Date
  },
  age: {
    type: Number
  },
  is_alive: {
    type: Boolean
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Get authors age
AuthorSchema.pre('save', function(next) {

  console.log('calculate age')

  if(this.dod) {
    this.is_alive = false;
  } else {
    this.is_alive = true;
  }

  next();
});

module.exports = mongoose.model('Author', AuthorSchema);

