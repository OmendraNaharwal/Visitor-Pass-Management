// visitor controller

const Visitor = require("../models/Visitor");

// add visitor
const addVisitor = async (req, res) => {

    try {

        const {
            fullName,
            email,
            phone,
            gender,
            company,
            purpose,
            host,
        } = req.body;

        // check required fields
        if (
            !fullName ||
            !email ||
            !phone ||
            !gender ||
            !purpose ||
            !host
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
            });
        }

        // email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email",
            });
        }

        // phone validation
        if (phone.length !== 10) {
            return res.status(400).json({
                success: false,
                message: "Phone number must be 10 digits",
            });
        }

        // create visitor
        const visitor = await Visitor.create({
            fullName,
            email,
            phone,
            gender,
            company,
            purpose,
            host,
            photo: req.file ? req.file.filename : "",
        });

        res.status(201).json({
            success: true,
            message: "Visitor added successfully",
            data: visitor,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// get all visitors
const getVisitors = async (req, res) => {

    try {

        const { search, status } = req.query;

        const filter = {};

        // search by name
        if (search) {
            filter.fullName = {
                $regex: search,
                $options: "i",
            };
        }

        // filter by status
        if (status) {
            filter.status = status;
        }

        // get visitors
        const visitors = await Visitor.find(filter)
            .populate("host", "name email role")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: visitors.length,
            data: visitors,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// get visitor by id
const getVisitorById = async (req, res) => {

    try {

        const visitor = await Visitor.findById(req.params.id)
            .populate("host", "name email role");

        // check visitor
        if (!visitor) {
            return res.status(404).json({
                success: false,
                message: "Visitor not found",
            });
        }

        res.status(200).json({
            success: true,
            data: visitor,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// update visitor
const updateVisitor = async (req, res) => {

    try {

        const visitor = await Visitor.findById(req.params.id);

        // check visitor
        if (!visitor) {
            return res.status(404).json({
                success: false,
                message: "Visitor not found",
            });
        }

        // email validation
        if (req.body.email) {

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(req.body.email)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid email",
                });
            }

        }

        // phone validation
        if (req.body.phone && req.body.phone.length !== 10) {
            return res.status(400).json({
                success: false,
                message: "Phone number must be 10 digits",
            });
        }

        // update fields
        visitor.fullName = req.body.fullName || visitor.fullName;
        visitor.email = req.body.email || visitor.email;
        visitor.phone = req.body.phone || visitor.phone;
        visitor.gender = req.body.gender || visitor.gender;
        visitor.company = req.body.company || visitor.company;
        visitor.purpose = req.body.purpose || visitor.purpose;
        visitor.host = req.body.host || visitor.host;
        visitor.status = req.body.status || visitor.status;

        // update photo
        if (req.file) {
            visitor.photo = req.file.filename;
        }

        // save changes
        await visitor.save();

        res.status(200).json({
            success: true,
            message: "Visitor updated successfully",
            data: visitor,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// delete visitor
const deleteVisitor = async (req, res) => {

    try {

        const visitor = await Visitor.findById(req.params.id);

        // check visitor
        if (!visitor) {
            return res.status(404).json({
                success: false,
                message: "Visitor not found",
            });
        }

        // delete visitor
        await visitor.deleteOne();

        res.status(200).json({
            success: true,
            message: "Visitor deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    addVisitor,
    getVisitors,
    getVisitorById,
    updateVisitor,
    deleteVisitor,
};