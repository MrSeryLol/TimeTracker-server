const ErrorAPI = require('../error/errorAPI')
const bcrypt = require('bcrypt')
const {User, Role, sequelize} = require('../models')

class EmployeeController {
    async create(req, res, next) {
        const { first_name, last_name, patronomyc, login, password } = req.body
        const companyId = req.userInfo.company_id
        try {
            const result = await sequelize.transaction(async (transaction) => {
                const candidate = await User.findOne({
                    where: {
                        login: login
                    }
                }, { transaction: transaction })

                console.log(candidate)

                if (candidate) {
                    return next(ErrorAPI.badRequest('Такой сотрудник уже существует'))
                }

                const hashPassword = bcrypt.hashSync(password, 7)
                const role = await Role.findOne({
                    where: {
                        role: "Сотрудник"
                    }
                }, { transaction: transaction })

                const employee = await User.create({
                    first_name: first_name,
                    last_name: last_name,
                    patronomyc: patronomyc,
                    login: login,
                    password: hashPassword,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }, { transaction: transaction})

                await employee.addRole(role.id, { transaction: transaction })
                await employee.setCompany(companyId, { transaction: transaction })

                return res.json({ employee })
            })
        } catch(err) {
            next(ErrorAPI.badRequest(err.message))
        }
    }
    async getAllEmployeesByCompany(req, res, next) {
        const companyId = req.userInfo.company_id

        const employees = await User.findAll({
            where: {
                company_id: companyId
            }
        })
        res.json(employees)
    }
}

module.exports = new EmployeeController()
