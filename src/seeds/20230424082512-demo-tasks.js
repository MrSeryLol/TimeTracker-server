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
        await queryInterface.bulkInsert('Tasks', [
            {
                
                task_name: "Написать Hello World",
                task_description: "Испытать успешную установку программы",
                priority: Sequelize.literal(`'Low'::"enum_Tasks_priority"`),
                project_id: 1,
                company_id: 1,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                
                task_name: "Создать функцию сложения",
                task_description: "Функция должна делать следующее:\n" +
                    "1) Иметь вид: add(int x, int y)\n" +
                    "2) Верно высчитывать значение\n",
                priority: Sequelize.literal(`'Medium'::"enum_Tasks_priority"`),
                project_id: 1,
                company_id: 1,
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                
                task_name: "Создать функцию умножения",
                task_description: "Функция должна делать следующее:\n" +
                    "1) Иметь вид: multiply(int x, int y)\n" +
                    "2) Верно высчитывать значение",
                priority: Sequelize.literal(`'High'::"enum_Tasks_priority"`),
                project_id: 1,
                company_id: 1,
                created_at: new Date(),
                updated_at: new Date()
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Tasks', null, {});
    }
};
