const ErrorAPI = require("../error/errorAPI");
const {Project, Task, Company, User, HistoryOfWork, sequelize} = require("../models");

class TaskController {
    async create(req, res, next) {
        const { task_name, task_description, project_name } = req.body
        const companyId = req.userInfo.company_id

        try {
            const result = await sequelize.transaction(async (transaction) => {
                const project = await Project.findOne({
                    attributes: ['id', 'project_name'],
                    where: {
                        company_id: companyId,
                        project_name: project_name
                    }
                }, { transaction: transaction })
                
                const task = await Task.create({
                    task_name: task_name,
                    task_description: task_description,
                    priority: 'Low',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    project_id: project.id
                }, { transaction: transaction })

                return res.json({ task })
            })
        } catch(err) {
            next(ErrorAPI.badRequest(err.message))
        }
    }

    async getAllTasks(req, res) {
        const company_id = req.userInfo.company_id
        const tasks = await Task.findAll({
            include: {
                model: Company,
                where: { id: company_id }
            }
        })
        return res.json(tasks)
    }

    async getTask(req, res) {
        const id = req.params.id
        const task = await Task.findOne({
            attributes: [['id', 'task_id'], 'task_description'],
            where: { id: id },
            include: [
                {
                    model: Project,
                    attributes: [['id', 'project_id'], 'project_name'],
                    required: true,
                },
                {
                    model: User,
                    attributes: [['id', 'user_id'], 'first_name', 'last_name', 'patronomyc'],
                    through: { attributes: [] },
                },
                {
                    model: HistoryOfWork,
                    attributes: [['id', 'history_id'], 'starting_time', 'ending_time', 'efficient_time'],
                }
            ],
        })
        return res.json(task)
    }
}

module.exports = new TaskController();