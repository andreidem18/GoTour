'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('bookings', 'date', {
      type: Sequelize.DATEONLY,
    })
    await queryInterface.addColumn('bookings', 'peopleNumber', {
      type: Sequelize.INTEGER,
    })
    await queryInterface.bulkUpdate('bookings', {
      date: new Date(),
      peopleNumber: 2
    },
    Sequelize.literal("date is null"));
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('bookings', 'date');
    await queryInterface.removeColumn('bookings', 'peopleNumber');
  }
};
