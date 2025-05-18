//Middleware to modify the res.send function, allowing us to log what is in the function before sending it out

const responseLogger = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (data) {
    console.log(new Date().toLocaleDateString(), "Response", data);
    return originalSend.call(this, data);
  };

  next();
};

module.exports = responseLogger;
