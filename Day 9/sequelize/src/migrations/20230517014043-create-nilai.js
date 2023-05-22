'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
  /**
   * Add altering commands here.
   *
   * Example:
   * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
   */
  await queryInterface.createTable('Nilais', {
   id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
   },
   nilai: {
    type: DataTypes.INTEGER
   },
   module: {
    type: DataTypes.STRING
   },
  });
 },

 async down(queryInterface, Sequelize) {
  /**
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */
 }
};
