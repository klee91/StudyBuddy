// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // // GET route for getting all of the posts
  // app.get("/api/posts", function(req, res) {
  //   var query = {};
  //   if (req.query.author_id) {
  //     query.AuthorId = req.query.author_id;
  //   }
  //   // 1. Add a join here to include all of the Authors to these posts
  //   db.Post.findAll({
  //     where: query,
  //     include: [db.Author]
  //   }).then(function(dbPost) {
  //     res.json(dbPost);
  //   });
  // });

  // Get rotue for retrieving buddy profile
  app.get("/api/buddies/:email", function(req, res) {
    db.Buddy.findOne({
      // include: [db.firstName],
      where: {
        email: req.params.email
      }
    }).then(function(dbBuddy) {
      console.log(dbBuddy);
      res.json(dbBuddy);
    });
  });

  // POST route for saving sign up info to database
    app.post("/api/buddies", function(req, res) {
      console.log(req.body);
    db.Buddy.create(req.body).then(function(dbBuddy) {

      res.json(dbBuddy);
    });
  });

  // // DELETE route for deleting posts
  // app.delete("/api/posts/:id", function(req, res) {
  //   db.Post.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbPost) {
  //     res.json(dbPost);
  //   });
  // });

  // PUT route for updating posts
  // app.put("/api/buddies", function(req, res) {
  //   db.Buddy.update(
  //     {
  //       where: {
  //         id: req.body.id
  //       }
  //     }).then(function(dbBuddy) {
  //       res.json(dbBuddy);
  //     });
  // });
};
