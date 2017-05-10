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

}
  // // Get route for retrieving a single post
  // app.get("/api/posts/:id", function(req, res) {
  //   // 2. Add a join here to include the Author who wrote the Post
  //   db.Post.findOne({
  //     include: [db.Author],
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbPost) {
  //     console.log(dbPost);
  //     res.json(dbPost);
  //   });
  // });

  // PUT route for updating buddies
//   app.put("/api/buddies", function(req, res) {
//     db.Post.update(
//       req.body,
//       {
//         where: {
//           id: req.body.id
//         }
//       }).then(function(dbPost) {
//         res.json(dbPost);
//       });
//   });
// };
