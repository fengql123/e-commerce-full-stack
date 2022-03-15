const sequelize = require("./connection");
const { DataTypes } = require("sequelize");
const User = require("./userModel");

const CheckOut = sequelize.define(
  "CheckOut",
  {
    payment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true, // Other model options go here
  }
);

CheckOut.belongsTo(User);
User.hasMany(CheckOut);

module.exports = CheckOut;
