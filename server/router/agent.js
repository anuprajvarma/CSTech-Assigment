const express = require("express");
const { AddAgentHandler, getAgentHandler } = require("../controller/agent");

const router = express.Router();

router.post("/addAgent", AddAgentHandler);
router.get("/", getAgentHandler);

module.exports = router;
