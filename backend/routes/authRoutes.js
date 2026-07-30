// auth routes
const { protect,authorize } = require("../middleware/authMiddleware");

const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser,
    getProfile,
    adminDashboard,
} = require("../controllers/authController");

// register
router.post("/register", registerUser);
// login
router.post("/login", loginUser);
// profile
router.get("/profile", protect, getProfile);
// admin route
router.get(
    "/admin",
    protect,
    authorize("Admin"),
    adminDashboard
);

module.exports = router;