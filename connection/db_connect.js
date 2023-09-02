const Sequelize = require("sequelize");

// const sequelize = new Sequelize(
//   "postgresql://raju5:v2_45HBW_85ETi3NNNe2WW2SQqMe2kWC@db.bit.io:5432/raju5/eshopping?sslmode=true"
// );

// const sequelize = new Sequelize(
//   "postgresql://raju5:BJoh962IfTjixBKyDp2rnw@tanned-quail-6038.8nk.cockroachlabs.cloud:26257/eshopping?sslmode=verify-full"
// );

const sequelize = new Sequelize(
  "postgres://edumbasankaravel513:5dgMQ8wrYKxc@ep-lingering-snowflake-94445869.ap-southeast-1.aws.neon.tech/eshopping",
  {
    dialect: "postgres", // Set the database dialect to PostgreSQL
    dialectOptions: {
      ssl: {
        require: true, // Use SSL to secure the connection
        rejectUnauthorized: false, // Allow self-signed certificates (if applicable)
      },
    },
  }
);

// const sequelize = new Sequelize("eshopping", "raju5", "raju5", {
//   host: "localhost",
//   port: 3306,
//   dialect: "mysql",
//   dialectModule: require("mysql2"),
// });

// const sequelize = new Sequelize("eshopping", "raju5", "qWQZ5pF*L0j9S9QD", {
//   host: "localhost",
//   dialect: "mysql",
//   dialectModule: require("mysql2"),
// });
module.exports = { sequelize };
