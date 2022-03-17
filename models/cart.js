"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      models.User.hasOne(Cart, {
        foreignKey: "userId",
      });
    }
  }
  Cart.init(
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
      sequelize,
      modelName: "Cart",
      freezeTableName: true,
    }
  );
  return Cart;
};
