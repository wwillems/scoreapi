// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var scoreController = require('./controllers/score');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');

// Connect to the scorestore MongoDB
//mongoose.connect('mongodb://localhost:27017/scorestore');
mongoose.connect('mongodb://scoreapi:scoreapipw@ds055690.mongolab.com:55690/scorestore');

// Create our Express application
var app = express();

app.set('port', (process.env.PORT || 3000))
app.use(express.static(__dirname + '/public'))

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /scores
router.route('/scores')
  .post(authController.isAuthenticated, scoreController.postScores)
  .get(authController.isAuthenticated, scoreController.getScores);

// Create endpoint handlers for /scores/:score_id
router.route('/scores/:score_id')
  .get(authController.isAuthenticated, scoreController.getScore)
  .put(authController.isAuthenticated, scoreController.putScore)
  .delete(authController.isAuthenticated, scoreController.deleteScore);

router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);
  
// Register all our routes with /api
app.use('/api', router);

// Start the server
//app.listen(3000);

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
