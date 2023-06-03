const { sequelize } = require("../connection/db_connect");
const { DataTypes, BOOLEAN, INTEGER, TIME } = require("sequelize");

const Products = sequelize.define("products", {
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  product_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: INTEGER,
    allowNull: false,
  },
  caption: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: INTEGER,
    allowNull: false,
  },
});

module.exports = { Products };
