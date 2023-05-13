const ErrorAPI = require('../error/errorAPI')
const {HistoryOfWork} = require('../models')

class HistoryOfWorkController {
    async saveActivity(req, res) {
        try {
            console.log(req.body)



        } catch (e) {
            console.log(e)
        }

    }
}

module.exports = new HistoryOfWorkController()