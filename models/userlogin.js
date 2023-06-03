const { sequelize } = require("../connection/db_connect");
const { DataTypes, BOOLEAN } = require("sequelize");

const userLogin = sequelize.define("userlogin", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  admin: {
    type: BOOLEAN,
    allowNull: false,
  },
});

// module.exports = userLogin = sequelize.model("userlogin", userLoginSchema);
module.exports={userLogin};
