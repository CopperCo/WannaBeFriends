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
      let maxDiff = 40;

      let currTotalScore = currentUser.scores.reduce(reducer);
      console.log(`${currentUser.name} score is ${currTotalScore}`);

      let bestMatch = null;
      let bestMatchScore = 41;
      friendsData.forEach(element => {
        if (currentUser.name != element.name) {
          var totalDiff = 0;
          // let potential = element.scores.reduce(reducer);
          // console.log(`${element.name} score is ${potential}`);
          for (
            var scoreIndex = 0;
            scoreIndex < element.scores.length;
            scoreIndex++
          ) {
            let diff = Math.abs(
              currentUser.scores[scoreIndex] - element.scores[scoreIndex]
            );
            totalDiff = totalDiff + diff;
          }
          if (totalDiff <= maxDiff) {
            if (totalDiff < bestMatchScore) {
              bestMatch = element;
              bestMatchScore = totalDiff;
              element.isBestMatch = true;
            }
          }
        }
      });
      return bestMatch;
    }

    let bestFriend = bestie(currentUser);
    console.log(bestFriend);

    app.get("/match", function(req, res) {
      return res.json(bestMatch);
    });

    // Clear data for friendsData
    app.post("/api/clear", function() {
      // Empty out the arrays of data
      friendsData = [];

      console.log(friendsData);
    });
  });
};
