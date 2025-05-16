const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//importing user schema
const User = require("../models/user.schema");

//Assigning express.Router() to a variable for easy access
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, mobile } = req.body;
  try {
    //check if registered email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
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
    res.status(500).json({
      message: "Internal error: Unable to create user",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    //checking if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    //If passwords do not match
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
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
    res.status(500).json({
      message: err.message,
    });
  }
});
module.exports = router;
