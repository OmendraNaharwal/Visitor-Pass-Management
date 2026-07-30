// appointment controller

const Appointment = require("../models/Appointment");
const Visitor = require("../models/Visitor");

// create appointment
const createAppointment = async (req, res) => {

    try {

        const {
            visitor,
            visitDate,
            visitTime,
            purpose,
        } = req.body;

        // check required fields
        if (
            !visitor ||
            !visitDate ||
            !visitTime ||
            !purpose
        ) {

            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
            });

        }

        // check visitor
        const visitorExists = await Visitor.findById(visitor);

        if (!visitorExists) {

            return res.status(404).json({
                success: false,
                message: "Visitor not found",
            });

        }

        // create appointment
       const appointment = await Appointment.create({

    visitor,
    employee: req.user._id,
    visitDate,
    visitTime,
    purpose,

});

        res.status(201).json({
            success: true,
            message: "Appointment created successfully",
            data: appointment,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};
// get all appointments
const getAppointments = async (req, res) => {

    try {

        const appointments = await Appointment.find()

            .populate(
                "visitor",
                "fullName email phone"
            )

            .populate(
                "employee",
                "name email role"
            )

            .sort({
                createdAt: -1,
            });

        res.status(200).json({

            success: true,
            count: appointments.length,
            data: appointments,

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message,

        });

    }

};
// update appointment status
const updateAppointmentStatus = async (req, res) => {

    try {

        const { status, remarks } = req.body;

        // find appointment
        const appointment = await Appointment.findById(req.params.id);

        // check appointment
        if (!appointment) {

            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });

        }

        // validate status
        if (
            status !== "Approved" &&
            status !== "Rejected"
        ) {

            return res.status(400).json({
                success: false,
                message: "Invalid status",
            });

        }

        // update
        appointment.status = status;
        appointment.remarks = remarks || "";

        await appointment.save();

        res.status(200).json({
            success: true,
            message: "Appointment updated successfully",
            data: appointment,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};
// get employee appointments
const getEmployeeAppointments = async (req, res) => {

    try {

        // get logged in employee appointments
        const appointments = await Appointment.find({
            employee: req.user._id,
        })

            .populate(
                "visitor",
                "fullName email phone company"
            )

            .sort({
                createdAt: -1,
            });

        res.status(200).json({
            success: true,
            count: appointments.length,
            data: appointments,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};
// get appointment by id
const getAppointmentById = async (req, res) => {

    try {

        const appointment = await Appointment.findById(
            req.params.id
        )

            .populate(
                "visitor",
                "fullName email phone company"
            )

            .populate(
                "employee",
                "name email"
            );

        if (!appointment) {

            return res.status(404).json({
                success: false,
                message: "Appointment not found",
            });

        }

        res.status(200).json({
            success: true,
            data: appointment,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    createAppointment,getAppointments,updateAppointmentStatus,getEmployeeAppointments, getAppointmentById,
};