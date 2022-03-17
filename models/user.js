"use strict";
const { Model } = require("sequelize");
const hash = require("object-hash");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
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
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your name",
          },
        },
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        isEmail: true,
        validate: {
          notNull: {
            msg: "Please enter your email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please enter your password",
          },
        },
        set(value) {
          // Storing passwords in plaintext in the database is terrible.
          // Hashing the value with an appropriate cryptographic hash function is better.
          this.setDataValue("password", hash(value));
        },
      },
      isSeller: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      freezeTableName: true,
    }
  );
  return User;
};
