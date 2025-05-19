//Middleware to modify the res.send function, allowing us to log what is in the function before sending it out
const fs = require("fs");
const responseLogger = (req, res, next) => {
  const file = fs.createWriteStream("./logs/res.txt", { flags: "a" });
  const originalSend = res.send;

  res.send = function (data) {
    file.write(
      new Date().toLocaleDateString() + "\n" + data + "\n\n",
      (err) => {
        if (err) {
          throw err;
        }
      }
    );
    return originalSend.call(this, data);
  };

  next();
};

module.exports = responseLogger;
