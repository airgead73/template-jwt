const mongoose = require('mongoose');
module.exports = {
  dropCollection: async function(collection) {
    await mongoose.connection.db.dropCollection(collection);
    console.log(`${collection} dropped`);
  }
}