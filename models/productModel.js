const sequelize = require("./connection");
const { DataTypes } = require("sequelize");
const User = require("./userModel");

const Product = sequelize.define(
  "Product",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your item name",
        },
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your item price",
        },
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter the amount of item in your inventory",
        },
      },
    },
  },
  {
    freezeTableName: true, // Other model options go here
  }
);

Product.belongsTo(User);
User.hasMany(Product);

module.exports = Product;
