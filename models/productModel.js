const sequelize = require("./connection");
const { DataTypes } = require("sequelize");

const Product = sequelize.define(
  "Product",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
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

module.exports = Product;
