// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;
var http = require('http').Server(app);
var io = require('socket.io')(http);

var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("./public"));
app.use(express.static("./public/chatroom/styles"))
// Routes =============================================================

require("./routes/buddy-api-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/signup-api-routes.js")(app);
require("./public/chatroom")(app);
// require("./routes/author-api-routes.js")(app);

// Syncing our sequelize models and then starting our express app
db.sequelize.sync({}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

