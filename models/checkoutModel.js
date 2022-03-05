const sequelize = require("./connection");
const { DataTypes } = require("sequelize");

const CheckOut = sequelize.define(
  "CheckOut",
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

module.exports = CheckOut;
