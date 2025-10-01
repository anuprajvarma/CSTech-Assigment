const express = require("express");
const { AddTaskHandler } = require("../controller/");

const router = express.Router();

router.post("/add", AddTaskHandler);

module.exports = router;
