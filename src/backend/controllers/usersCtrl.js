var { User } = require("../db_orm");
// get current user
exports.users = function(req, res) {
  // find
  User.findAll()
    .then(function(users) {
      if (users) {
        var jsonResponse = { users: users };
        res.json(jsonResponse);
      } else {
        res.send(
          JSON.stringify({
            error: "Login Error",
            message:"!users"
          })
        );
      }
    })
    .catch(function(err) {
      res.send(
        JSON.stringify({
          error: "Login Error",
          message:err.message
        })
      );
    });
};
