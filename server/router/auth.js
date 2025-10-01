const express = require("express");
const { LoginHandler, handleSignout } = require("../controller/auth");

const router = express.Router();

router.post("/login", LoginHandler);

router.post("/signout", handleSignout);

module.exports = router;
