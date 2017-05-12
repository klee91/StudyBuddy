// *********************************************************************************
// buddy-api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

//get route for all buddies
app.get("/api/buddies", function(req, res) {
    db.Buddy.findAll({}).then(function(dbBuddy) {
      res.json(dbBuddy);
      console.log(dbBuddy);
      res.end();
    });
});

//get route for filtered subject
app.get("/api/:academicSub?", function(req, res) {
    var query = req.params.academicSub;
    console.log(query);
    db.Buddy.findAll({
      where: {
        study_subject: query
      }
    }).then(function(dbBuddy) {
      res.json(dbBuddy);
      console.log(dbBuddy);
      res.end();
    });
});

//get route for one buddy
app.get("/api/buddies/:username", function(req, res) {
    db.Buddy.findOne({
      where: {
        email: req.params.username
      }
    }).then(function(dbBuddy) {
      res.json(dbBuddy);
      console.log(dbBuddy);
      res.end();
    });
});

// PUT route for updating specific buddy info
    app.put("/api/buddies/:id", function(req, res) {
      var updateInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        state: req.body.state,
        city: req.body.city,
        age: req.body.age,
        phoneNumber: req.body.phone,
        gender: req.body.gender,
        school: req.body.school,
        AOS: req.body.aos,
        study_subject: req.body.study_subject,
      }
      db.Buddy.update(updateInfo, {
        where: {
          id: req.body.id
        }
      }).then(function(dbBuddy) {
        res.json(dbBuddy);
      })
    });
}

