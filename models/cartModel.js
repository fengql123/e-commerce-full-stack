const sequelize = require("./connection");
const { DataTypes } = require("sequelize");

const Cart = sequelize.define(
  "Cart",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
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

module.exports = Cart;
