const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//importing user schema
const User = require("../models/user.schema");

//Assigning express.Router() to a variable for easy access
const router = express.Router();

router.post("/register", async (req, res, next) => {
  const { name, email, password, mobile } = req.body;
  try {
    //check if registered email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      const error = new Error("User already exists");
      error.name = "ValidationError";
      throw error;
    } else {
      //Create hashed password
      const hashedPassword = await bcrypt.hash(password, 10);
      //Creating entry in database
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        mobile,
      });

      //sending response to frontend
      res.status(201).json({
        message: "User created successfully!",
      });
    }
  } catch (err) {
    //sending to error handler
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //checking if user exists
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User does not exist!");
      error.name = "ValidationError";
      throw error;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    //If passwords do not match
    if (!isPasswordValid) {
      const error = new Error("Password does not match");
      error.name = "UnauthorizedError";
      throw error;
    }
    //creating jwt token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    //send out success response
    res.status(200).json({
      message: "User logged in successfully!",
      token,
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
