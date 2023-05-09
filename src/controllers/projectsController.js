//const { sequelize, Sequelize } = require('../models')

const {Project, Task} = require("../models")


class projctsController {
    async getAllProject(req, res) {
        const projects = await Project.findAll();
        // {
        //     where: {
        //         project_id: 1
        //     }
        // }
        return res.json(projects)
    }

    async getOneProject(req, res) {
        const id = req.params.id;
        //console.log(console.log('Request Id:', req.params.id))
        const project = await Project.findOne({
            where: {
                project_id: id,
                // include: {
                //     model: Task,
                //     required: true
                // }
            },
            include: {
                model: Task,
                //required: true,
                as: 'tasks'
            }
        })
        return res.json(project)
    }
}


module.exports = new projctsController()