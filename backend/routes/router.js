const express = require("express");
const router = express();
const AuthenticationController = require("../controllers/authenticationController");
router.post("/signup", AuthenticationController.registerUser);
router.post("/login", AuthenticationController.loginUser);

module.exports = { router };
