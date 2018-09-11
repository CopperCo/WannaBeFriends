const friendsData = require("../data/friends.js");
const bodyParser = require("body-parser");

// ROUTING
module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    return res.json(friendsData);
  });

  app.use(bodyParser.json());
  // API POST Requests
  app.post("/api/friends", function(req, res) {
    let currentUser = req.body;
    friendsData.push(currentUser);
    // console.log(friendsData);

    function bestie(currentUser) {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      let maxDiff = 0;

      let currTotalScore = currentUser.scores.reduce(reducer);
      console.log(`${currentUser.name} score is ${currTotalScore}`);

      friendsData.forEach(element => {
        if (currentUser.name != element.name) {
          let totalDiff = 0;
          let potential = element.scores.reduce(reducer);
          console.log(`${element.name} score is ${potential}`);

          let diff = currTotalScore - potential;
          console.log(diff);

          totalDiff = totalDiff + diff;

          if (totalDiff <= maxDiff) {
            winningFriend = element;
            maxDiff = totalDiff;
          }
          return winningFriend;
        }
      });
    }

    let bestFriend = bestie(currentUser);
    console.log(bestFriend);

    // Clear data for friendsData
    app.post("/api/clear", function() {
      // Empty out the arrays of data
      friendsData = [];

      console.log(friendsData);
    });
  });
};
