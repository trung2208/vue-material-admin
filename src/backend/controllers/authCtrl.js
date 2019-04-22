/* global __dirname */

"use strict";
//#region old auth method
/*
exports.doLogin = function(req, res) {
  console.log(req.body);
  var params = req.body;
  var status = false;
  if (params.username == undefined || params.passwd == undefined) {
    res.json(status);
  } else {
    User.findAll({
      where: {
        username: params.username,
        passwd: params.passwd
      }
    }).then(function(users) {
      console.log(users);
      if (users.length > 0) {
        console.log("valid user!");
        status = true;
        res.json(status);
      } else {
        res.json(status);
      }
    });
  }
};

exports.login_require=function(req,res){
    
}*/
//#endregion

// var User = require('../models/user');
const { User } = require("../db_orm");
var config = require("../util/config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

exports.isAuthenticated = function(req, res, next=undefined) {
  console.log(req.headers.authorization);
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    var jwtToken = req.headers.authorization.split(" ")[1];
    jwt.verify(jwtToken, config.jwtSecret, function(err, payload) {
      if (err) {
        res
          .status(401)
          .json({ message: "Unauthorized user!", err: err.message });
      } else {
        console.log("decoder: " + payload.username);
        // find
        User.findOne({
          where: {
            username: payload.username
          }
        })
          .then(user => {
            if (user) {
              //console.log(user.toPublicJSON());
              req.user = user.toPublicJSON();
              console.log("user:"+JSON.stringify(req.user));
              next();
            } else {
              res.status(401).json({ message: "Unauthorized user!" });
            }
          })
          .catch(function(err) {
            res
              .status(401)
              .json({ message: "Unauthorized user!", err: err.message });
          });
      }
    });
  } else {
    res.status(401).json({ message: "Unauthorized user!" });
  }
};
