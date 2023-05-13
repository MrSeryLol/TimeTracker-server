'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        try {
            await queryInterface.sequelize.transaction(async (t) => {
                await queryInterface.addConstraint('Users', {
                    fields: ['company_id'],
                    type: 'foreign key',
                    name: 'user_company_FK_constraint',
                    references: {
                        table: 'Companies',
                        field: 'id'
                    }
                }), { transaction: t };
                await queryInterface.addConstraint('Projects', {
                    fields: ['company_id'],
                    type: 'foreign key',
                    name: 'project_company_FK_constraint',
                    references: {
                        table: 'Companies',
                        field: 'id'
                    }
                }), { transaction: t };
                await queryInterface.addConstraint('Tasks', {
                    fields: ['project_id'],
                    type: 'foreign key',
                    name: 'task_project_FK_constraint',
                    references: {
                        table: 'Projects',
                        field: 'id'
                    }
                }), { transaction: t };
                await queryInterface.addConstraint('HistoryOfWorks', {
                    fields: ['project_id'],
                    type: 'foreign key',
                    name: 'history_project_FK_constraint',
                    references: {
                        table: 'Projects',
                        field: 'id'
                    }
                }), { transaction: t };
                await queryInterface.addConstraint('HistoryOfWorks', {
                    fields: ['task_id'],
                    type: 'foreign key',
                    name: 'history_task_FK_constraint',
                    references: {
                        table: 'Tasks',
                        field: 'id'
                    }
                }), { transaction: t };
                await queryInterface.addConstraint('HistoryOfWorks', {
                    fields: ['user_id'],
                    type: 'foreign key',
                    name: 'history_user_FK_constraint',
                    references: {
                        table: 'Users',
                        field: 'id'
                    }
                }), { transaction: t };
                await queryInterface.addConstraint('UserRoles', {
                    fields: ['user_id'],
                    type: 'foreign key',
                    name: 'user_role_FK_constraint',
                    references: {
                        table: 'Users',
                        field: 'id'
                    }
                }), { transaction: t };
                await queryInterface.addConstraint('UserRoles', {
                    fields: ['role_id'],
                    type: 'foreign key',
                    name: 'role_user_FK_constraint',
                    references: {
                        table: 'Roles',
                        field: 'id'
                    }
                }), { transaction: t };
                await queryInterface.addConstraint('UserProjects', {
                    fields: ['user_id'],
                    type: 'foreign key',
                    name: 'user_project_FK_constraint',
                    references: {
                        table: 'Users',
                        field: 'id'
                    }
                }), { transaction: t };
                await queryInterface.addConstraint('UserProjects', {
                    fields: ['project_id'],
                    type: 'foreign key',
                    name: 'project_user_FK_constraint',
                    references: {
                        table: 'Projects',
                        field: 'id'
                    }
                }), { transaction: t };
                await queryInterface.addConstraint('UserTasks', {
                    fields: ['user_id'],
                    type: 'foreign key',
                    name: 'user_task_FK_constraint',
                    references: {
                        table: 'Users',
                        field: 'id'
                    }
                }), { transaction: t };
                await queryInterface.addConstraint('UserTasks', {
                    fields: ['task_id'],
                    type: 'foreign key',
                    name: 'task_user_FK_constraint',
                    references: {
                        table: 'Tasks',
                        field: 'id'
                    }
                }), { transaction: t };
            })
        } catch(err) {
            console.log("Произошла ошибка: " + err)
        }
    },

    async down(queryInterface, Sequelize) {
        try {
            await queryInterface.sequelize.transaction(async (t) => {
                await queryInterface.removeConstraint('Users', 'user_company_FK_constraint'),
                { transaction: t };
                await queryInterface.removeConstraint('Projects', 'project_company_FK_constraint'),
                { transaction: t };
                await queryInterface.removeConstraint('Tasks', 'task_project_FK_constraint'),
                { transaction: t}; 
                await queryInterface.removeConstraint('HistoryOfWorks', 'history_project_FK_constraint'),
                { transaction: t };
                await queryInterface.removeConstraint('HistoryOfWorks', 'history_task_FK_constraint'),
                { transaction: t };
                await queryInterface.removeConstraint('HistoryOfWorks', 'history_user_FK_constraint'),
                { transaction: t };
                await queryInterface.removeConstraint('UserRoles', 'user_role_FK_constraint'),
                { transaction: t };
                await queryInterface.removeConstraint('UserRoles', 'role_user_FK_constraint'),
                { transaction: t };
                await queryInterface.removeConstraint('UserProjects', 'user_project_FK_constraint'),
                { transaction: t };
                await queryInterface.removeConstraint('UserProjects', 'project_user_FK_constraint'),
                { transaction: t };
                await queryInterface.removeConstraint('UserTasks', 'user_task_FK_constraint'),
                { transaction: t };
                await queryInterface.removeConstraint('UserTasks', 'task_user_FK_constraint'),
                { transaction: t };
            })
        } catch(err) {
            console.log("Произошла ошибка: " + err)
        }
    }
};