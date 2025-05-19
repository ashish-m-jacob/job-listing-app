//middleware to log every error that is thrown
const fs = require("fs");
const errorHandler = (err, req, res, next) => {
  const file = fs.createWriteStream("./logs/error.txt", { flags: "a" });
  file.write(new Date().toLocaleDateString() + "\n" + err + "\n\n", (err) => {
    if (err) {
      throw err;
    }
  });

  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.message,
      errors: "ValidationError",
    });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      message: err.message,
      errors: "UnauthorizedError",
    });
  }

  if (err.name === "ForbiddenError") {
    return res.status(403).json({
      message: err.message,
      errors: "ForbiddenError",
    });
  }

  return res.status(500).json({
    message: err.message,
    errors: "InternalServerError",
  });
};

module.exports = errorHandler;
