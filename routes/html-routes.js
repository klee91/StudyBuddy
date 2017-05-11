// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.html
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  // map route loads map.html
  app.get("/map", function(req, res) {
    res.render("map");
  });

  // profile route loads profile.html
  app.get("/profile", function(req, res) {
    res.render("profile");
  });

  // settings route loads settings.html
  app.get("/settings", function(req, res) {
    res.render("settings");
  });

  // studybuddy route loads studybuddy.html
  app.get("/studybuddy", function(req, res) {
    res.render("studybuddy", { title: 'The Buddifier', layout: 'studybuddylayout' })
  });

  app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});

};