// visitor routes
const upload = require("../middleware/uploadMiddleware");
const express = require("express");

const router = express.Router();

const { addVisitor  , getVisitors , getVisitorById, updateVisitor, deleteVisitor} = require("../controllers/visitorController");

const {
    protect,
    authorize,
} = require("../middleware/authMiddleware");

// add visitor
router.post(
    "/",
    protect,
    authorize("Admin", "Security"),
    upload.single("photo"),
    addVisitor
);
// get all visitors
router.get(
    "/",
    protect,
    authorize("Admin", "Security"),
    getVisitors
);
// get visitor by id
router.get(
    "/:id",
    protect,
    authorize("Admin", "Security"),
    getVisitorById
);
// update visitor
router.put(
    "/:id",
    protect,
    authorize("Admin", "Security"),
    updateVisitor
);
//delete visitor
// delete visitor
router.delete(
    "/:id",
    protect,
    authorize("Admin", "Security"),
    deleteVisitor
);

module.exports = router;