require("dotenv").config();
const { User } = require('../backend/db_orm');

// User.sync().then(() => {
//       // Now the `users` table in the database corresponds to the model definition
//       return User.create({
//             username: "trungv",
//             passwd: "trungnv",
//             first_name: "Trung",
//             last_name: "Nguyen",
//             email: "trung.nguyen.96@hotmail.com",
//             phone: "+840372361996"
//           });
//         });
        User.findAll().then(users => {
            console.log("All users:", JSON.stringify(users, null, 4));
          });