const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Authentication middleware
const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract the token

  if (token == null) return res.sendStatus(401); // Unauthorized if token is not found

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden if token verification fails
    req.user = user; // Attach user information to the request
    next();
  });
};

module.exports = auth;
