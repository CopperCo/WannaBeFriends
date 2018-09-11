// Dependencies
const express = require("express");
const bodyParser = require("body-parser");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Points server to route files
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log(`Click to open app: http://localhost:${PORT} `);
  console.log(`App listening on PORT: ${PORT}`);
});
