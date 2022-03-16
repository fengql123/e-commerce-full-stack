"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("CheckOuts", {
      payment: {
        type: DataTypes.STRING,
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
    await queryInterface.dropTable("CheckOuts");
  },
};
