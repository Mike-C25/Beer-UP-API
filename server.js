var express = require("express");
var logger = require("morgan");
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
dotenv.load();

var PORT = process.env.PORT || 3001;
var app = express();

// Controllers
var apiController = require("./controllers/api.js");

// Set the app up with morgan
app.use(logger("dev"));


/*
  if we don't do this here then we'll get this error in apps that use this api

  Fetch API cannot load No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

  read up on CORs here: https://www.maxcdn.com/one/visual-glossary/cors/
*/
//allow the api to be accessed by other apps
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
});

// Tells us how to handle routes based on controller paths (i.e. we tell this to use the root path and THEN use whatever we set up in twitterController)
app.use("/", apiController);


// Listen on port 3001
app.listen(PORT, function () {
  console.log('🌎 ==> Now listening on PORT %s! Visit http://localhost:%s in your browser!', PORT, PORT);
});