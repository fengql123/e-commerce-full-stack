const sequelize = require("./connection");
const { DataTypes } = require("sequelize");

const Order = sequelize.define(
  "Order",
  {
    payment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "id",
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
  },
  {
    freezeTableName: true, // Other model options go here
  }
);

module.exports = Order;
