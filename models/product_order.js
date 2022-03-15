const sequelize = require("./connection");
const { DataTypes } = require("sequelize");
const Order = require("./orderModel");
const Product = require("./productModel");

const Product_Order = sequelize.define(
  "Product_Order",
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

Order.belongsToMany(Product, { through: Product_Order });
Product.belongsToMany(Order, { through: Product_Order });

module.exports = Product_Order;
