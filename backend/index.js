//setting up server
const express = require("express");
//importing cors
const cors = require("cors");
//importing mongoose
const mongoose = require("mongoose");
//importing bodyparser
const bodyParser = require("body-parser");
//importing user routes
const userRoutes = require("./routes/user");

//If there is no port available, assign the value 8080
const port = process.env.PORT || 8080;

const app = express();

//importing dependancy to use environment variables
const env = require("dotenv");
//require environment variables
env.config();

//allowing requests from all origins
app.use(cors());

//setting up bodyParser
app.use(bodyParser.json()); //Used to parse JSON request
app.use(bodyParser.urlencoded({ extended: true })); //Used to parse form data

//endpoint for Home page
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from server",
  });
});

//Setting up user routes
app.use("/user", userRoutes);
//running server on a port
app.listen(port, () => {
  //Lets you know when the app is running successfully
  console.log(`Listening on port ${port}`);

  //Connecting to database
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log(`Successfully connected to database!`);
    })
    .catch((err) => {
      console.log(err);
    });
});
