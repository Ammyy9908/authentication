const router = require("express").Router();
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
  try {
    const isValid = await jwt.verify(token, "topscret");
    if (!isValid) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    req.user = isValid.id;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
router
  .post("/create", async (req, res) => {
    const { email, password } = req.body;

    // first check is user already inside database
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).send("User already exists");
    }
    // make a new entry in  a database

    // make the password encrypted before saving it in the database

    const hash = await bcryptjs.hash(password, 10);
    const newUser = new User({
      email,
      password: hash,
    });
    const is_saved = await newUser.save();
    if (is_saved) {
      res.status(200).send("User created successfully");
    } else {
      res.status(400).send("Failed to create user");
    }
  })
  .post("/login", async (req, res) => {
    const { email, password } = req.body;
    /// first check is user already in database or not
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send({ message: "No user found with this email" });
    }

    // next compare password
    const is_match = await bcryptjs.compare(password, user.password);
    if (!is_match) {
      return res.status(400).send({ message: "Incorrect password & username" });
    }

    // create a jwt token using the user id
    const token = await jwt.sign({ id: user._id }, "topscret");
    res.status(200).send({ token });
  })
  .get("/user", verifyToken, async (req, res) => {
    const user = await User.findOne({ _id: req.user });
    if (user) {
      res.status(200).send(user);
    }
  });

module.exports = router;
