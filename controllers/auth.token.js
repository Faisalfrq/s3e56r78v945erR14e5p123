const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = {
      id: decoded.id, // Assuming the user ID is stored in the 'id' field of the JWT payload
    };

    next();
  });
};

module.exports = authenticateToken;
