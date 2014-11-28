// Load required packages
var mongoose = require('mongoose');

var ScoreSchema = new mongoose.Schema({
  user: String,
  level: Number,
  date: Date,
  timeInSeconds: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Score', ScoreSchema);