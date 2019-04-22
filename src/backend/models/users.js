
var bcrypt = require("bcrypt");
var _ = require("underscore");
module.exports = (sequelize, type) => {
  var User = sequelize.define(
    "Users",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: type.STRING,
        allowNull: false
      },
      last_name: {
        type: type.STRING,
        allowNull: false
        // allowNull defaults to true
      },
      username: {
        type: type.STRING,
        allowNull: false
      },
      salt: {
        type: type.STRING
      },
      hassed_passwd: {
        type: type.STRING
      },
      passwd: {
        type: type.STRING,
        allowNull: false,
        set: function(value) {
          var salt = bcrypt.genSaltSync(10);
          var hashed_password = bcrypt.hashSync(value, salt);
          this.setDataValue("passwd", value);
          this.setDataValue("salt", salt);
          this.setDataValue("hassed_passwd", hashed_password);
        }
      },
      email: {
        type: type.STRING,
        allowNull: false
      },
      phone: {
        type: type.STRING,
        allowNull: false
      },super_user:{
        type:type.BOOLEAN,
        defaultValue:false
      },active:{
        type:type.BOOLEAN,
        defaultValue:false
      }
    },
    {
      // Sequelize,
      timestamps: true
    }
  ); 
  User.prototype.toPublicJSON = function() {
    var json = this.toJSON();
    return _.pick(json, "id", "email", "createdAt", "updatedAt");
  };
  User.prototype.passwordIsValid = function(password) {
    return bcrypt.compareSync(password, this.hassed_passwd);
  };
  User.prototype.getFullName=function(){
    return this.first_name+" "+this.last_name;
  }
  return User;
};
