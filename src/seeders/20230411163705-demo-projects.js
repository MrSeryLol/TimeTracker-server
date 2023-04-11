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

        await queryInterface.bulkInsert('Projects', [
            {
                project_id: 1,
                project_name: "Создать программу",
                project_description: "Описать этапы проектирования и прочего",
                estimate_time: 20,
                company_id: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                project_id: 2,
                project_name: "Создать дизайн",
                project_description: "Описать дизайн",
                estimate_time: 10,
                company_id: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                project_id: 3,
                project_name: "Создать инструменты",
                project_description: "Какие инструменты",
                estimate_time: 1,
                company_id: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('People', null, {});
    }
};
