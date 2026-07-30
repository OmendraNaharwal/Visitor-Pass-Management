// appointment routes
const {
    createAppointment,
    getAppointments,
    updateAppointmentStatus,
    getEmployeeAppointments,
    getAppointmentById,
} = require("../controllers/appointmentController");
const express = require("express");

const router = express.Router();

const {
    createAppointment,
} = require("../controllers/appointmentController");

const {
    protect,
    authorize,
} = require("../middleware/authMiddleware");

// create appointment
router.post(
    "/",
    protect,
    authorize("Admin", "Employee"),
    createAppointment
);
// get appointments
router.get(
    "/",
    protect,
    authorize("Admin", "Security"),
    getAppointments
);
// update appointment status
router.put(
    "/:id/status",
    protect,
    authorize("Admin", "Security"),
    updateAppointmentStatus
);
// employee appointments
router.get(
    "/my-appointments",
    protect,
    authorize("Employee"),
    getEmployeeAppointments
);
// appointment details
router.get(
    "/:id",
    protect,
    authorize(
        "Admin",
        "Security",
        "Employee"
    ),
    getAppointmentById
);

module.exports = router;