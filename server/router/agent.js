const express = require("express");
const { AddAgentHandler } = require("../controller/agent");

const router = express.Router();

router.post("/addAgent", AddAgentHandler);

module.exports = router;
