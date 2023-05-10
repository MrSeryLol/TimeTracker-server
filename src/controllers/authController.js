const ErrorAPI = require('../error/errorAPI')
const { User, UserRole, Role, Company, sequelize } = require('../models')
const bcrypt = require('bcrypt')

class AuthController {
    async registration(req, res, next) {
        try {
            const result = await sequelize.transaction(async (transaction) => {
                const { first_name, last_name, patronomyc, login, password, company_name } = req.body
                const candidate = await User.findOne({
                    where: {
                        login: login
                    }
                }, { transaction: transaction })
                if (candidate) {
                    return next(ErrorAPI.badRequest('Такой пользователь уже существует'))
                }

                const hashPassword = bcrypt.hashSync(password, 7)
                const role = await Role.findOne({
                    where: {
                        role: "Руководитель"
                    }
                })
                
                const company = await Company.create({
                    company_name: company_name,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    Users: {
                        first_name: first_name,
                        last_name: last_name,
                        patronomyc: patronomyc,
                        login: login,
                        password: hashPassword,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        Roles: {
                            role: role
                        }
                    }
                }, {
                    include: [{
                        model: User,
                        include: [ Role ]
                    }]
                }, { transaction: transaction })

                return res.json({ message: 'Пользователь успешно зарегистрирован!' })
            })
        } catch (err) {
            console.log(err)
            //next(ErrorAPI.badRequest(err.message))
        }
    }
    async login(req, res) {

    }
}

module.exports = new AuthController()