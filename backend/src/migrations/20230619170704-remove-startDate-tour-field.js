'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('tours', 'startDate');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('tours', 'startDate', {
      type: DataTypes.DATEONLY,
      allowNull: false
    });
  }
};
