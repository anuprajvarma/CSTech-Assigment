// middleware/upload.js
const multer = require("multer");

const storage = multer.memoryStorage(); // store in memory for parsing
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file format. Only CSV, XLSX, XLS allowed."), false);
    }
  },
});

module.exports = upload;
