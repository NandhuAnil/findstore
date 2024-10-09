const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  searchID: {
    type: String,
    required: true,
    unique: true,
  },
  urls: {
    type: [String], 
    required: true,
  },
});

const Search = mongoose.model('Search', searchSchema);
module.exports = Search;