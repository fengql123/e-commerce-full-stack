const sequelize = require("./connection");
const { DataTypes } = require("sequelize");
const User = require("./userModel");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    freezeTableName: true, // Other model options go here
  }
);

Order.belongsTo(User);
User.hasMany(Order);

module.exports = Order;
