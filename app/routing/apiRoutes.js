const friendsData = require("../data/friends.js");

// ROUTING
module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    return res.json(friendsData);
  });

  // API POST Requests
  app.post("/api/friends", function(req, res) {
    let currentUser = req.body;
    friendsData.push(currentUser);
    console.log(friendsData);
  });
};
