//const { sequelize, Sequelize } = require('../models')

const ErrorAPI = require("../error/errorAPI");
const {Project, User, HistoryOfWork, Task, Company, sequelize} = require("../models");
const user = require("../models/user");

class ProjctsController {
    async create(req, res, next) {
        const { project_name, project_description, estimate_time } = req.body
        const companyId = req.userInfo.company_id

        try {
            const result = await sequelize.transaction(async (transaction) => {
                const project = await Project.create({
                    project_name: project_name,
                    project_description: project_description,
                    estimate_time: estimate_time,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }, { transaction: transaction})

                await project.setCompany(companyId, { transaction: transaction })
                return res.json({ project })
            })
        } catch(err) {
            next(ErrorAPI.badRequest(err.message))
        }
    }
    async getAllProjects(req, res) {
        const token = req.userInfo
        const projects = await Project.findAll({
            include: {
                model: Company,
                where: {
                    id: token.company_id
                },
            }
        });
        return res.json(projects)
    }

    async getAllProjectsForEmployee(req, res) {
        const userId = req.params.user_id
        console.log(userId)

        const userProjects = await User.findOne({
            attributes: [['id', 'user_id']],
            where: { id: userId },
            include: {
                model: Project,
                through: { attributes: [] },
                required: true
            }
        })

        console.log(userProjects)
        res.json(userProjects)
    }

    async getOneProject(req, res) {
        const id = req.params.id;
        const project = await Project.findOne({
            attributes: [['id', 'project_id'], 'project_name', 'project_description', 'created_at', 'updated_at'],
            where: {
                id: id
            },
            include: [
                {
                    model: Task,
                    attributes: [['id', 'task_id'], 'task_name'],
                    required: true
                },
                {
                    model: User,
                    attributes: [['id', 'user_id'], 'first_name', 'last_name', 'patronomyc'],
                    through: { attributes: [] },
                },
                {
                    model: HistoryOfWork,
                    attributes: [['id', 'history_id'], 'starting_time', 'ending_time', 'efficient_time'] 
                }
            ]
        })
        return res.json(project)
    }
}

module.exports = new ProjctsController()