'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
        */
        queryInterface.bulkInsert('UserTasks', [
            {
                user_id: 1,
                task_id: 1,
            },
            {
                user_id: 1,
                task_id: 2
            }
        ])

    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */

        queryInterface.bulkDelete('UserTasks', null, {})
    }
};
