const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  lname: {
    type: String,
    required: [true, 'Add last name.'],
    trim: true
  },
  fname: {
    type: String
  },
  name_titlepage: {
    type: String
  },
  affiliation: {
    type: String
  },
  listing: {
    type: String
  },
  slug: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

AuthorSchema.pre('save', function(next) {
  let initial = (this.fname).charAt(0);
  let listing = `${this.lname}, ${initial}`;
  let slug = `${this.lname}_${this.fname}`;
  slug = slug.toLowerCase();

  this.listing = listing;
  this.slug = slug;

  next();

});

module.exports = mongoose.model('Author', AuthorSchema);

