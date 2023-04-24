//const { sequelize, Sequelize } = require('../models')

const {Project} = require("../models")


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
}


module.exports = new projctsController()