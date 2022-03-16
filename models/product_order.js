"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Order.belongsToMany(models.Product, { through: Product_Order });
      models.Product.belongsToMany(models.Order, { through: Product_Order });
    }
  }
  Product_Order.init(
    {
      // Model attributes are defined here
      product_qt: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product_Order",
      freezeTableName: true,
      timestamps: false, // Other model options go here
    }
  );
  return Product_Order;
};
