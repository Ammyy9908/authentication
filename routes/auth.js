const router = require("express").Router();
const User = require("../models/user");
router.post("/create", async (req, res) => {
  const { email, password } = req.body;

  // first check is user already inside database
  const user = await User.findOne({ email: email });
  if (user) {
    return res.status(400).send("User already exists");
  }
});

module.exports = { router };
