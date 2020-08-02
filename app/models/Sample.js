const mongoose = require('mongoose');

const SampleSchema = new mongoose.Schema({
  name: {
    type: String,
    max: [100, 'Name should be less than 100 characters.']
  },
  status: {
    type: String,
    enum: ['active', 'inactive']
  },
  desc: {
    type: String,
    max: [100, 'Name should be less than 100 characters.']
  },
  due: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Sample', SampleSchema);