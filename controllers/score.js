// Load required packages
var Score = require('../models/score');

// Create endpoint /api/scores for POSTS
exports.postScores = function(req, res) {
  // Create a new instance of the Score model
  var score = new Score();

  

  // Set the score properties that came from the POST data
  score.user = req.body.user;
  score.level = req.body.level;
  score.date = req.body.date;
  score.timeInSeconds = req.body.timeInSeconds;

  // Save the score and check for errors
  score.save(function(err) {
    if (err)
      res.send(err);

//    res.json({ message: 'Score added to the store.', data: score });
    res.json({ message: 'Score added to the store...', data: JSON.stringify(req) });
  });
};

// Create endpoint /api/scores for GET
exports.getScores = function(req, res) {
  // Use the Score model to find all score
  Score.find(function(err, scores) {
    if (err)
      res.send(err);

    res.json(scores);
  });
};

// Create endpoint /api/scores/:score_id for GET
exports.getScore = function(req, res) {
  // Use the Score model to find a specific score
  Score.findById(req.params.score_id, function(err, score) {
    if (err)
      res.send(err);

    res.json(score);
  });
};

// Create endpoint /api/scores/:score_id for PUT
exports.putScore = function(req, res) {
  // Use the Score model to find a specific score
  Score.findById(req.params.score_id, function(err, score) {
    if (err)
      res.send(err);

    // Update the existing score quantity
    score.quantity = req.body.quantity;

    // Save the score and check for errors
    score.save(function(err) {
      if (err)
        res.send(err);

      res.json(score);
    });
  });
};

// Create endpoint /api/scores/:score_id for DELETE
exports.deleteScore = function(req, res) {
  // Use the Score model to find a specific score and remove it
  Score.findByIdAndRemove(req.params.score_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Score removed from the store.' });
  });
};