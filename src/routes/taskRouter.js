const Router = require('express')
const router = new Router();
const taskController = require('../controllers/taskController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware("Руководитель"), taskController.create)

module.exports = router