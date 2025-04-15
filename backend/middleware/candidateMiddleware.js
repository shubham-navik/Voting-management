const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.candidateAuth = async (req, res, next) => {
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYW5kaWRhdGUiOnsiaWQiOiI2N2ZkNDVlMGNjMGU4OTAwNWM5YjE5MzAiLCJuYW1lIjoiYzMiLCJlbWFpbCI6ImMzLmNvbSJ9LCJpYXQiOjE3NDQ3MTk4MzIsImV4cCI6MTc0NDgwNjIzMn0.Qtii95LTD_IhL8RLfZOiqeH3TbAbQkG6e1a0QYGDDE8";
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