//All routes pertaining to actions about jobs are in here
const express = require("express");
const router = express.Router();
const Job = require("../models/job.schema");
const authMiddleware = require("../middleware/authMiddleware");

//retrieving all available jobs
router.get("/", async (req, res, next) => {
  try {
    const jobs = await Job.find();
    res.send(jobs);
  } catch (err) {
    next(err);
  }
});

//getting specific job
router.get("/:id", authMiddleware, async (req, res, next) => {
  const id = req.params.id;
  try {
    const job = await Job.findById(id);

    if (job) {
      res.send(job);
    } else {
      const error = new Error("Job not found");
      error.name = "NotFoundError";
      throw error;
    }
  } catch (err) {
    next(err);
  }
});

//adding a job
router.post("/", authMiddleware, async (req, res, next) => {
  const { name, description, type, location, salary, skills } = req.body;

  try {
    const job = Job.create({
      name,
      description,
      type,
      location,
      salary,
      skills: skills.split(",").map((skill) => skill.trim),
      createdBy: req.user,
    });
    res.send(job);
  } catch (err) {
    next(err);
  }
});

//updating a job
router.put("/:id", authMiddleware, async (req, res, next) => {
  const id = req.params.id;

  const { name, description, type, location, salary, skills } = req.body;

  try {
    const job = await Job.findById(id);

    //job can only be updated by the person that posted it
    if (job.createdBy.toString() !== req.user.toString()) {
      const error = new Error("You are not authorized to use this job!");
      error.name = "ForbiddenError";
      throw error;
    }
    await Job.findByIdAndUpdate(
      {
        name,
        description,
        type,
        location,
        salary,
        skills: skills.split(",").map((skill) => skill.trim),
        updatedAt: Date.now(),
      },
      { new: true }
    );
  } catch (err) {
    next(err);
  }
});

//deleting a job
router.delete("/:id", authMiddleware, async (req, res, next) => {
  const id = req.params.id;

  try {
    const job = await Job.findById(id);

    //job can only be deleted by the person that posted it
    if (job.createdBy.toString() !== req.user.toString()) {
      const error = new Error("You are not authorized to delete this job!");
      error.name = "ForbiddenError";
      throw error;
    }
    await Job.findByIdAndDelete(id);
    res.send("Job deleted successfully!");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
