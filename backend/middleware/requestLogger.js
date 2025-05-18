//Middleware to log every request - allows to backtrack requests
const fs = require("fs");
const requestLogger = (req, res, next) => {
  const file = fs.createWriteStream("./logs/req.txt", { flags: "a" });
  //Logging time, method and url of request
  file.write(
    new Date().toLocaleDateString() +
      " " +
      req.url +
      " " +
      "\n" +
      JSON.stringify(req.headers) +
      "\n" +
      JSON.stringify(req.body) +
      "\n\n",
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
  next();
};

module.exports = requestLogger;
