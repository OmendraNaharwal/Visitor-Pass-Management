// auth middleware

const jwt = require("jsonwebtoken");
const User = require("../models/User");

// protect routes
const protect = async (req, res, next) => {

    try {

        let token;

        // check token
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {

            // get token
            token = req.headers.authorization.split(" ")[1];

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // get user
            req.user = await User.findById(decoded.id).select("-password");

            next();

        } else {

            res.status(401).json({
                success: false,
                message: "Not authorized",
            });

        }

    } catch (error) {

        res.status(401).json({
            success: false,
            message: "Invalid token",
        });

    }

};
// check user role
const authorize = (...roles) => {

    return (req, res, next) => {

        // check role
        if (!roles.includes(req.user.role)) {

            return res.status(403).json({
                success: false,
                message: "Access denied",
            });

        }

        next();

    };

};

module.exports = {
    protect,authorize,
};