'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('UserProjects', {
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        project_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('UserProjects')
  }
};
