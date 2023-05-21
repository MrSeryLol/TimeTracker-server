'use strict';
const bcrypt = require('bcrypt')

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

        await queryInterface.bulkInsert('Users', [
            {
                first_name: "Сергей",
                last_name: "Полежаев",
                patronomyc: "Юрьевич",
                login: "psygentelmen014@gmail.com",
                password: bcrypt.hashSync("1234", 7),
                created_at: new Date(),
                updated_at: new Date(),
                company_id: 1
            },
            {
                first_name: "Осанов",
                last_name: "Кирилл",
                patronomyc: "Глебович",
                login: "osanov@gmail.com",
                password: bcrypt.hashSync("1234", 7),
                created_at: new Date(),
                updated_at: new Date(),
                company_id: 1
            },
            {
                first_name: "Василий",
                last_name: "Пупкин",
                patronomyc: "Васильевич",
                login: "aboba@gmail.com",
                password: bcrypt.hashSync("1234", 7),
                created_at: new Date(),
                updated_at: new Date(),
                company_id: 1
            },
        ])

        await queryInterface.bulkInsert('UserRoles', [
            {
                user_id: 1,
                role_id: 2
            },
            {
                user_id: 2,
                role_id: 2
            },
            {
                user_id: 3,
                role_id: 1
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
        await queryInterface.bulkDelete('Users', null, {})
        await queryInterface.bulkDelete('UserRoles', null, {})
    }
};
