//Model for jobs to be present

const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String },
  salary: { type: String, required: true },
  skills: { type: [String], required: true },
  createdBy: {
    //creating reference to User document containing information of user
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Job", jobSchema);
