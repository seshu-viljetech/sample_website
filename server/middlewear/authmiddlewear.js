const jwt = require("jsonwebtoken")
secret_key = "hdcndjncdljvckdsjnc5352adscsacf";
const authmiddlewear = (req, res, next) => {

    const token = req.header("Authorization")?.replace("Bearer ", "");


    if (!token) {
        return res.status(401).json({ message: "Authentication token is required" });
    }

    try {
        const decoded = jwt.verify(token, secret_key); 
        req.user = decoded; 

        next();
    } catch (err) {
        return res.status(400).json({ message: "Invalid or expired token" });
    }
};

module.exports = authmiddlewear