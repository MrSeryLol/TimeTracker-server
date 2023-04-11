'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HistoryOfWorks', {
      history_id: {
        type: Sequelize.INTEGER
      },
      starting_time: {
        type: Sequelize.DATE
      },
      efficient_time: {
        type: Sequelize.TIME
      },
      unefficient_time: {
        type: Sequelize.TIME
      },
      date: {
        type: Sequelize.DATEONLY
      },
      is_being_late: {
        type: Sequelize.BOOLEAN
      },
      is_early_finished: {
        type: Sequelize.BOOLEAN
      },
      project_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Projects",
          key: "project_id"
        }
      },
      task_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Tasks",
          key: "task_id"
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "user_id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('HistoryOfWorks');
  }
};