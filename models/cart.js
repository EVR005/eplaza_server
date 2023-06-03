const { sequelize } = require("../connection/db_connect");
const { DataTypes, BOOLEAN, INTEGER, TIME } = require("sequelize");
const { Products } = require("./products");

const Cart = sequelize.define("cart", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    default: 0,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    default: 0,
    allowNull: false,
  },
  req_quantity: {
    type: DataTypes.INTEGER,
    default: 0,
    allowNull: false,
  },
});

module.exports = { Cart };
