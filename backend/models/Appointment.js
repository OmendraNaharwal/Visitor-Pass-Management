// appointment model

const mongoose = require("mongoose");

// appointment schema
const appointmentSchema = new mongoose.Schema(
    {

        visitor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Visitor",
            required: true,
        },

        employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        visitDate: {
            type: Date,
            required: true,
        },

        visitTime: {
            type: String,
            required: true,
        },

        purpose: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Approved",
                "Rejected"
            ],
            default: "Pending",
        },

        remarks: {
            type: String,
            default: "",
            trim: true,
        },

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "Appointment",
    appointmentSchema
);