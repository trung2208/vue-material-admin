var express = require('express');
var router = express.Router();

var users_controller = require('../controllers/usersCtrl');
var auth_controller = require('../controllers/authCtrl');

// GET list users
router.get('/', auth_controller.isAuthenticated, users_controller.users);
module.exports = router;