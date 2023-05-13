'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('HistoryOfWorks', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            starting_time: {
                type: Sequelize.DATE
            },
            ending_time: {
                type: Sequelize.DATE
            },
            efficient_time: {
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.DATEONLY
            },
            // project_id: {
            //     type: Sequelize.INTEGER,
            //     references: {
            //         model: "Projects",
            //         key: "project_id"
            //     }
            // },
            // task_id: {
            //     type: Sequelize.INTEGER,
            //     references: {
            //         model: "Tasks",
            //         key: "task_id"
            //     }
            // },
            // user_id: {
            //     type: Sequelize.INTEGER,
            //     type: Sequelize.INTEGER,
            //     references: {
            //         model: "Users",
            //         key: "user_id"
            //     }
            // },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deleted_at: {
                type: Sequelize.DATE
            },
            project_id: {
                type: Sequelize.INTEGER
            },
            task_id: {
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('HistoryOfWorks');
    }
};