const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "id_proof_image") {
            cb(null, "uploads/evaluator-id-proof");
        } else if (file.fieldname === "resume_file") {
            cb(null, "uploads/evaluator-resume");
        } else {
            cb(new Error("Invalid file field"));
        }
    },
    filename: (req, file, cb) => {
        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

// Image-only filter
const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPG, JPEG, PNG images allowed"), false);
    }
};

module.exports = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});
