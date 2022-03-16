"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      models.User.hasMany(Order, {
        foreignKey: "userId",
      });
    }
  }
  Order.init(
    {
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
      modelName: "Order",
      freezeTableName: true,
    }
  );
  return Order;
};
