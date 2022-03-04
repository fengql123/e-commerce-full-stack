const sequelize = require("./connection");
const { DataTypes } = require("sequelize");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
    },
  },
  {
    freezeTableName: true, // Other model options go here
  }
);

module.exports = Order;
