'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('locations', 'name', {
      type: Sequelize.STRING,
      allowNull: false
    });
    await queryInterface.addColumn('locations', 'country', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('locations', 'name');
    await queryInterface.removeColumn('locations', 'country');
  }
};
