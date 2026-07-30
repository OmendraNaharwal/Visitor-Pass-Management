// upload middleware

const multer = require("multer");
const path = require("path");

// storage
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "uploads/visitors");
    },

    filename: function (req, file, cb) {

        const fileName =
            Date.now() + path.extname(file.originalname);

        cb(null, fileName);

    },

});

// file filter
const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpg|jpeg|png/;

    const isValid = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    if (isValid) {
        cb(null, true);
    } else {
        cb(new Error("Only JPG, JPEG and PNG files are allowed"));
    }

};

// upload
const upload = multer({
    storage,
    fileFilter,
});

module.exports = upload;