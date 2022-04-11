const express = require("express");
const connect_db = require("./utils/db_connect");
const app = express();
const auth_routes = require("./routes/auth");
connect_db().then((is_connected) => {
  if (is_connected) {
    console.log("Connected to database");
  } else {
    console.log("Failed to connect to database");
  }
});
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).send("Welcome to App");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
