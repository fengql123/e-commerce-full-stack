"use strict";

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Cart_Products", {
      product_qt: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Cart_Products");
  },
};
