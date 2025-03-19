const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.adminAuth = async (req, res, next) => {
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6IjY3ZDliN2UzZTAzZmU2MDZlOTNiNTI3ZiIsIm5hbWUiOiJFQzEiLCJlbWFpbCI6ImVjMS5jb20ifSwiaWF0IjoxNzQyMzIxNjQ5LCJleHAiOjE3NDI0MDgwNDl9._V09btnN0e_T8KB0sNyBJlzTzYiN9EnXFwfwe_NGYz8";
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    try {
        console.log("token: "+token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.admin = decoded.admin;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
}