var express = require('express');
var request = require('request');
var http = require('http');
var engines = require('consolidate');

var app = express();

var apiKey = "dc6zaTOxFJmzC";

app.set('port', 8080);
app.use(express.static(__dirname + '/public'));
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.get('/', function(req, res) {res.render('index.html')});

var requestString = 'http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC';
request(requestString, function (error, response, body) {
  if (!error && response.statusCode == 200) {
  	console.log(response);
  }
});   

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});