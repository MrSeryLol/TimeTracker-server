const ErrorAPI = require("../error/errorAPI");
const {Project, Task, Company, sequelize} = require("../models");

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
}

module.exports = new TaskController();