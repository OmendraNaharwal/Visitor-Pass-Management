// import packages

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

// load env file
dotenv.config();

// connect database
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", require("./routes/authRoutes"));

// test route
app.get("/", (req, res) => {
    res.send("Visitor Pass Management API Running");
});

// port
const PORT = process.env.PORT || 5000;

// start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});