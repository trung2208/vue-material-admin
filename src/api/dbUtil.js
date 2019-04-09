"use strict";
var mysql = require("mysql");
var self = this;
self.pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'root',
    database        : '24hcode'
  });
// self.pool = mysql.createPool({
//   connectionLimit: process.env.DB_CONNECTION_LIMIT,
//   host: process.env.DB_HOST,
//   user: process.env.USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_DATABASE
// });
// self.pool.connect(function(err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }

//   console.log("connected as id " + connection.threadId);
// });
function run_query(query, cb) {
  if (err) throw err;
  console.debug("connected to DB");
  self.con.query(query, function(err, results) {
    if (err) throw err;
    console.debug(results);
    cb(results);
  });
}
function call_query(query, cb) {
  self.pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!

    // Use the connection
    connection.query(query, function(error, results, fields) {
      cb(results);
      // When done with the connection, release it.
      connection.release();

      // Handle error after the release.
      if (error) throw error;

      // Don't use the connection here, it has been returned to the pool.
    });
  });
}
module.exports = {
  query: call_query
};
