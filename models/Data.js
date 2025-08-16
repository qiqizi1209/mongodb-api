const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Data', DataSchema);