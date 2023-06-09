const ErrorAPI = require('../error/errorAPI')
const bcrypt = require('bcrypt')
const {User, Role, Task, HistoryOfWork, Project, Company,  sequelize} = require('../models')
const {Op} = require('sequelize')
const user = require('../models/user')

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
    async getAllEmployeesByCompany(req, res) {
        const companyId = req.userInfo.company_id

        const employees = await User.findAll({
            where: {
                company_id: companyId
            }
        })
        return res.json(employees)
    }

    async getOneEmployee(req, res) {
        const id = req.params.id;
        const employee = await User.findOne({
            attributes: [['id', 'user_id'], 'first_name', 'last_name', 'patronomyc'],
            where: { id: id }
        })
        return res.json(employee)
    }

    async addEmployeeToProject(req, res, next) {
        const { user_id, project_id } = req.body
        try {
            const result = sequelize.transaction(async (transaction) => {
                for (let id of user_id) {
                    const employee = await User.findOne({
                        attributes: ['id'],
                        where: {
                            id: id,
                        }
                    }, { transaction: transaction })

                    await employee.addProject(project_id, { transaction: transaction }) 
                }
                
                res.json({ message: "Сотрудники добавлены на проект!" })
            })
        } catch(err) {
            next(ErrorAPI.badRequest("Сотрудники не были добавлены на проект!"))
        }
    }

    async getEmployeeActivity(req, res, next) {
        const { from, to } = req.query
        const { id } = req.params

        try {
            const userActivity = await User.findOne({
                attributes: [['id', 'user_id']],
                where: { id: id },
                include: [
                    {
                        model: Task,
                        attributes: [['id', 'task_id'], 'task_name'],
                        through: { attributes: [] },
                    },
                    {
                        model: HistoryOfWork,
                        attributes: [['id', 'history_id'], 'starting_time', 'ending_time', 'efficient_time'],
                        where: { 
                            starting_time: { [Op.gt]: new Date(from) },
                            ending_time: { [Op.lt]: new Date(to) } 
                        }
                    }
                ]
            })
            return res.json(userActivity)
        } catch(err) {
            return next(ErrorAPI.badRequest("Некорректный ввод даты!"))
        }
    }

    async getEmployeeTask(req, res, next) {
        const { from, to } = req.query
        const { id } = req.params
        const { task_id } = req.body

        try {
            const userTask = await User.findOne({
                attributes: [['id', 'user_id']],
                where: { id: id },
                include: [
                    {
                        model: Task,
                        attributes: [['id', 'task_id'], 'task_name', 'task_description'],
                        where: { id: task_id },
                        through: { attributes: [] },
                    },
                    {
                        model: HistoryOfWork,
                        attributes: [['id', 'history_id'], 'starting_time', 'ending_time', 'efficient_time'],
                        where: { 
                            task_id: task_id,
                            starting_time: { [Op.gt]: new Date(from) },
                            ending_time: { [Op.lt]: new Date(to) } 
                        }
                    }
                ]
            })
            return res.json(userTask)
        } catch(err) {
            return next(ErrorAPI.badRequest("Некорректный ввод задачи!"))
        }
    }
}

module.exports = new EmployeeController()
