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
app.get('/gifs', function(req, res) {
	//res.render('index.html')
	var userInput = req.query.searchInput;
	var correctInput = userInput.replace(" ", "+");
	console.log(correctInput);
	
	var requestString = 'http://api.giphy.com/v1/gifs/search?q=' + correctInput + '&api_key=dc6zaTOxFJmzC';

	request(requestString, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	var gifArray = [];
	  	var rsp = JSON.parse(body);
	  	var data = rsp.data;
	  	//Grabs gif URL and adds to array 
	  	for (var i = 0; i <= data.length - 1; i++) {
	  		var dblock = data[i];
	  		var imgs = dblock.images;
	  		var org = imgs.original;
	  		var gif = org.url;
	  		gifArray.push(gif);
	  	};
	  	console.log(gifArray)
	  	res.send(gifArray);
	  }
	});   
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});