"use strict";
var express = require("express");
var router = express.Router();
var user_controller = require("../controllers/userCtrl");
var auth_controller = require("../controllers/authCtrl");

// Register
router.post("/register", user_controller.register);

// Login
router.post("/login", user_controller.login);
// Logout
router.get("/logout", auth_controller.isAuthenticated, user_controller.logout);

module.exports = router;
