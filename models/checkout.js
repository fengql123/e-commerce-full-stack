"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CheckOut extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CheckOut.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      models.User.hasMany(CheckOut, {
        foreignKey: "userId",
      });
    }
  }
  CheckOut.init(
    {
      payment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "CheckOut",
      freezeTableName: true,
    }
  );
  return CheckOut;
};
