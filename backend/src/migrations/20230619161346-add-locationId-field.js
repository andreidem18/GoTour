'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('tours', 'locationId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'locations',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('tours', 'locationId');
  }
};
