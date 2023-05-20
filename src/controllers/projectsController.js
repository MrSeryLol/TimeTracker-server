//const { sequelize, Sequelize } = require('../models')

const ErrorAPI = require("../error/errorAPI");
const {Project, Task, Company, sequelize} = require("../models");

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

    async getOneProject(req, res) {
        const id = req.params.id;
        const project = await Project.findOne({
            where: {
                id: id
            },
            include: {
                model: Task,
            }
        })
        return res.json(project)
    }
}

module.exports = new ProjctsController()