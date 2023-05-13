'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('UserTasks', {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        task_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('UserTasks')
  }
};
