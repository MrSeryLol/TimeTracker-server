const Router = require('express')
const router = new Router();
const historyOfController = require('../controllers/historyOfWorkController')

router.post('/saveActivity', historyOfController.saveActivity)

module.exports = router

