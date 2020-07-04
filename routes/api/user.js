const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//Load Input Validation
const validateRegisterInput = require("../../validators/register");
const validateLoginInput = require("../../validators/login");

//Load User model
const User = require("../../models/user");

// @route   GET api/users/test
// @desc    Test users route
// @access  Public
router.get("/test", (req, res) => {
  res.json({
    msg: "users works",
  });
});

// @route   POST api/users/register
// @desc    Register User
// @access  Public
// try catch incomplete
router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(async (user) => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: req.body.avatar,
        password: req.body.password,
      });
      const hash = await bcrypt.hash(newUser.password, 10);
      newUser.password = hash;
      const user = await newUser.save();

      const payload = {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      }; //Create JWT payload

      //Sign Token
      const token = await jwt.sign(payload, keys.secretOrKey, {
        expiresIn: 43200,
      });
      res.json({
        success: true,
        token: "Bearer " + token,
      });
    }
  });
});

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  console.log(req.body);
  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  //find user by email
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    //Check Password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //User match
        const payload = {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
        }; //Create JWT payload

        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Password Incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

module.exports = router;
