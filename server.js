// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var exphbs = require("express-handlebars");
var PORT = process.env.PORT || 8080;
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// Sets up the Express Handlebars.js
// =============================================================



app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./public"));
app.use(express.static("./"));
// Routes =============================================================

require("./routes/buddy-api-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/signup-api-routes.js")(app);
// require("./routes/author-api-routes.js")(app);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({}).then(function() {
	io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
	
  http.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  
});
  });



