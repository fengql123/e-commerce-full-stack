"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart_Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Cart.belongsToMany(models.Product, { through: Cart_Product });
      models.Product.belongsToMany(models.Cart, { through: Cart_Product });
    }
  }
  Cart_Product.init(
    {
      // Model attributes are defined here
      product_qt: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Cart_Product",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return Cart_Product;
};
