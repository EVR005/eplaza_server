const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "postgresql://raju5:v2_45HBW_85ETi3NNNe2WW2SQqMe2kWC@db.bit.io:5432/raju5/eshopping?sslmode=true"
);

// const sequelize = new Sequelize("eshopping", "raju5", "qWQZ5pF*L0j9S9QD", {
//   host: "localhost",
//   dialect: "mysql",
//   dialectModule: require("mysql2"),
// });
module.exports = { sequelize };
