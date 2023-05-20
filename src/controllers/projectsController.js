//const { sequelize, Sequelize } = require('../models')

const {Project, Task, Company} = require("../models");

class ProjctsController {
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