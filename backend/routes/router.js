const express = require("express");
const router = express();
const AuthenticationController = require("../controllers/authenticationController");
router.post("/signup", AuthenticationController.registerUser);

module.exports = { router };
