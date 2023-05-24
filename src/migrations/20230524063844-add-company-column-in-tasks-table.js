'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    try {
        await queryInterface.sequelize.transaction(async (t) => {
            await queryInterface.addColumn('Tasks', 'company_id', { type: Sequelize.INTEGER }), {transaction: t}
            await queryInterface.addConstraint('Tasks', {
                fields: ['company_id'],
                    type: 'foreign key',
                    name: 'task_company_FK_constraint',
                    references: {
                        table: 'Companies',
                        field: 'id'
                    }
            }, {transaction: t})
        })
    } catch(err) {
        console.log("Произошла ошибка: " + err)
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    try {
        await queryInterface.sequelize.transaction(async (t) => {
            await queryInterface.removeConstraint('Tasks', 'task_company_FK_constraint'), { transaction: t };
            await queryInterface.removeColumn('Tasks', 'company_id'), { transaction: t };
        })
    } catch(err) {
        console.log("Произошла ошибка: " + err)
    }
  }
};
