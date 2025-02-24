const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {

    let token;
    let authHeader = req.headers.authorization || req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No token provided. Access denied." });
    }

    token = authHeader.split(" ")[1];
    // console.log("Token from client:", token);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            // console.error("JWT Verification Error:", err);
            return res.status(403).json({ error: "Invalid token. User is not authorized." });
        }

        req.user = decoded.user;
        // console.log("Decoded Token Data:", req.user);
        next();
    });
});

module.exports = validateToken;
