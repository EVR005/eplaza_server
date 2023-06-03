// const mysql = require("mysql");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "raju5",
//   password: "raju5",
//   database: "treasure_hunt",
// });

// const sequelize = () => {
//   connection.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected Database!");
//   });
// };

// module.exports = { sequelize };

const Sequelize = require("sequelize");
// const sequelize = new Sequelize(
//   "treasure_hunt",
//   "raju5",
//   "v2_44JKZ_RZG423xZsLxSCyL2CmjyS6C",
//   {
//     host: "localhost",
//     port: 5432,
//     dialect: "mysql",
//     dialectModule: require("mysql2"),
//   }
// );
// const sequelize = new Sequelize(
//   "postgresql://raju5:v2_44JKZ_RZG423xZsLxSCyL2CmjyS6C@db.bit.io:5432/raju5/treasure_hunt?sslmode=true"
// );

const sequelize = new Sequelize("eshopping", "raju5", "qWQZ5pF*L0j9S9QD", {
  host: "localhost",
  dialect: "mysql",
  dialectModule: require("mysql2"),
});
module.exports = { sequelize };
