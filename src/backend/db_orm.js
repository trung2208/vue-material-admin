require("dotenv").config();
const Sequelize = require("sequelize");
const UserModel = require("./models/users");
const sequelize = new Sequelize("24hcode", "root", "root", {
  host: "localhost",
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamp: true
  }
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });
const User = UserModel(sequelize, Sequelize);
sequelize.sync({alter:true}).then(() => {
  console.log(`Database & tables synced!`);
});

module.exports = {
  User
};
