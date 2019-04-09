/*
 * Filename: d:\Project\vue-material-admin\app.js
 * Path: d:\Project\vue-material-admin
 * Created Date: Saturday, April 6th 2019, 5:35:08 pm
 * Author: trung
 *
 * Copyright (c) 2019 Your Company
 */

var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
//import models
const { User } = require("./src/backend/db_orm");

// import routes
//var login = require("./src/backend/route/loginRoute");
var auth = require("./src/backend/routes/auth");
var user = require("./src/backend/routes/user");
var users = require("./src/backend/routes/users");

//config server
var app = express();
app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(express.static(path.join(__dirname, "dist")));
app.set("view engine", "html");

// config routes to server
app.use("/api/v1", auth);
app.use("/api/v1/user", user);
app.use("/api/v1/users", users);
//auth(app);
//user(app);
//users(app);

//location for session

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  //return 500;
  //res.render("error");
  res.json({ status: "error", message: err.message, code: err.status || 500 });
});

module.exports = app;
