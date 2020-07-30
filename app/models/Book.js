const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String
  },
  edition: {
    type: Number
  },
  author_lead: {
    type: mongoose.Schema.ObjectId,
    ref: 'Author'
  },
  date_publication: {
    type: Date
  }
});

module.exports = mongoose.model('Book', BookSchema);