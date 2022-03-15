const sequelize = require("./connection");
const { DataTypes } = require("sequelize");
const User = require("./userModel");

const Cart = sequelize.define(
  "Cart",
  {
    // Model attributes are defined here
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

Cart.belongsTo(User);
User.hasOne(Cart);

module.exports = Cart;
