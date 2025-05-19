//middleware for authorizing tokens

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const authMiddleware = (req, res, next) => {
  //authorization is a token in which jwt's are passed
  const token = req.headers.authorization;
  try {
    if (token) {
      const isTokenValid = jwt.verify(token, process.env.SECRET_KEY);
      if (isTokenValid) {
        const decodedToken = jwt.decode(token);
        res.user = decodedToken.id;
        next();
      } else {
        const error = new Error("Invalid token");
        error.name = "UnauthorizedError";
        throw error;
      }
    } else {
      const error = new Error("No token is provided");
      error.name = "UnauthorizedError";
      throw error;
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authMiddleware;
