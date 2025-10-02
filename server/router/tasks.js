const express = require("express");
const { AddTaskHandler, GetTaskHandler } = require("../controller/tasks");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/upload", upload.single("file"), AddTaskHandler);
router.get("/", GetTaskHandler);

module.exports = router;
