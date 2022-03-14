const sequelize = require("./connection");
const { DataTypes } = require("sequelize");
const Cart = require("./cartModel");
const Product = require("./productModel");

const Cart_Product = sequelize.define(
  "Cart_Product",
  {
    // Model attributes are defined here
    product_qt: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false, // Other model options go here
  }
);

Cart.belongsToMany(Product, { through: Cart_Product });
Product.belongsToMany(Cart, { through: Cart_Product });

module.exports = Cart_Product;
