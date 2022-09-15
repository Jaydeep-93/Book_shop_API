const express = require("express");
const authController = require("../controller/auth");

const router = express.Router();

router.get("/login", authController.loginUser);

router.post("/signup", authController.signup);

module.exports = router;
