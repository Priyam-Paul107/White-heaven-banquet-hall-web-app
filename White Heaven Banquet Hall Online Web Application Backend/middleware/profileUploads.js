const multer = require("multer");
const path = require("path");

// storage location & filename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, "uploads/profileImages"); // make sure folder exists
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

// File filter (optional, to allow only images)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};


const upload = multer({ storage ,fileFilter});

module.exports = upload;
