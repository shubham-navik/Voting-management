const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.candidateAuth = async (req, res, next) => {
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYW5kaWRhdGUiOnsiaWQiOiI2N2Q5YzNkMTQ2MGZmZjgxYmZiYzZiY2UiLCJuYW1lIjoiQSIsImVtYWlsIjoiYS5jb20ifSwiaWF0IjoxNzQyMzI0Njk5LCJleHAiOjE3NDI0MTEwOTl9.-p-f63OUprlzJl_KB5LIjJnH82fFfdIK01xmkl-lotI";
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    try {
        console.log("token: "+token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.candidate = decoded.candidate;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
}