'use strict';
const Sequelize = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface) {
  /**
   * Add altering commands here.
   *
   * Example:
   * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
   */
  await queryInterface.alterTable('Branches', {
   id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
   },
   branch: {
    type: Sequelize.STRING
   },
   address: {
    type: Sequelize.STRING
   }
  });
 },

 async down(queryInterface, Sequelize) {
  /**
   * Add reverting commands here.
   *
   * Example:
   * await queryInterface.dropTable('users');
   */

  await queryInterface.dropTable('Branches');
 }
};
// sequelize migration:generate --name create-branch-table
