const mongoose = require('mongoose');
module.exports = {
  dropCollection: async function(collection) {
    await mongoose.connection.db.dropCollection('authors');
    console.log(`${collection} dropped`);
  }
}