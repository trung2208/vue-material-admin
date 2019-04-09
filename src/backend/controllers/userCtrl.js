var { User } = require("../db_orm");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var config = require("../util/config");

// register
exports.register = function(req, res) {
  // get user
  User.build(req.body)
    .save()
    .then(function(newUser) {
      console.log("add " + newUser.username + "successfully!"); // John
      // John is now in your db!
      // newUser.hash_password = undefined;
      res.json({ message: "Save ok", data: newUser });
    })
    .catch(function(error) {
      res.json({ code: false, message: "Error to save", err: error.message });
      return;
    });
};

// login
exports.login = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.log("user: " + username);
  // find
  User.findOne({
    where: { username: username }
  })
    .then(function(user) {
      // var user=result.get({ plain: true });
      console.log(user);
      if (user == undefined) {
        res.json({ error: "User is not exist" });
      } else if (user && user.passwordIsValid(password)) {
        var payload = { username: user.username };
        var jwtToken = jwt.sign(payload, config.jwtSecret, {
          expiresIn: 1 * 3600
        });
        console.log("jwtToken: " + jwtToken);
        var jsonResponse = {
          access_token: jwtToken,
          refresh_token: "xxxxx-xxx-xx-x"
        };
        res.json(jsonResponse);
      } else {
        res.json({ error: "Login Error" });
      }
    })
    .catch(function(err) {
      // handle error;
      res.json({ error: "error queries " ,message:err.message});
    });
};
exports.logout = function(req, res) {
  res.json({ data: "logout" });
};
