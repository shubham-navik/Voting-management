const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.voterAuth = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  const token = authHeader.split(' ')[1];
  console.log("Token",token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.voter = decoded.voter; // assuming your payload looks like { voter: {...} }
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
