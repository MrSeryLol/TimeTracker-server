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
        queryInterface.bulkInsert('HistoryOfWorks', [
            {
                starting_time: new Date('2023-05-20T10:24:00'),
                ending_time: new Date('2023-05-20T11:20:00'),
                efficient_time: 3600,
                created_at: new Date(),
                updated_at: new Date(),
                project_id: 1,
                task_id: 1,
                user_id: 1
            },
            {
                starting_time: new Date('2023-05-21T11:50:10'),
                ending_time: new Date('2023-05-21T13:59:01'),
                efficient_time: 500,
                created_at: new Date(),
                updated_at: new Date(),
                project_id: 1,
                task_id: 1,
                user_id: 1
            },

            {
                starting_time: new Date('2023-05-22T12:43:20'),
                ending_time: new Date('2023-05-22T14:59:01'),
                efficient_time: 2000,
                created_at: new Date(),
                updated_at: new Date(),
                project_id: 1,
                task_id: 2,
                user_id: 1
            },

        ])
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        queryInterface.bulkDelete('HistoryOfWorks', null, {})
    }
};
