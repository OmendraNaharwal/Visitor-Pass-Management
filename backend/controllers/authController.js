// auth controller

const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// register user
const registerUser = async (req, res) => {

    try {

        const { name, email, password, role } = req.body;

        // check empty fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            });
        }

        // check email
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "Email already registered",
            });
        }

        // create user
        const user = await User.create({
            name,
            email,
            password,
            role,
        });

        // response
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            token: generateToken(user._id),
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};
// login user
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // check empty fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            });
        }

        // find user
        const user = await User.findOne({ email });

        // check user and password
        if (!user || !(await user.matchPassword(password))) {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });

        }

        // login success
        res.status(200).json({
            success: true,
            message: "Login successful",
            token: generateToken(user._id),
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};
// get profile
const getProfile = async (req, res) => {

    res.status(200).json({
        success: true,
        data: req.user,
    });

};

// admin dashboard
const adminDashboard = async (req, res) => {

    res.status(200).json({
        success: true,
        message: "Welcome Admin",
    });

};

module.exports = {
    registerUser, loginUser, getProfile, adminDashboard,
};