const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.voterAuth = async (req, res, next) => {
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2b3RlciI6eyJpZCI6IjY3ZGFiNjk4Y2ZiMjQ0OGFlYzQwOWI3MiIsIm5hbWUiOiJ2MiIsImVtYWlsIjoidjIuY29tIiwiZ292SWQiOiI2N2RhYjY5OGNmYjI0NDhhZWM0MDliNzIifSwiaWF0IjoxNzQ0NTcxNzM3LCJleHAiOjE3NDQ2NTgxMzd9.oNNSQcsw10jEm8whf7__fWYf9v82x3qLRq1UGeairfY";
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    try {
        console.log("token: "+token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.voter = decoded.voter;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
}