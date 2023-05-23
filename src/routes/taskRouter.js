const Router = require('express')
const router = new Router();
const taskController = require('../controllers/taskController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', checkRoleMiddleware("Руководитель"), taskController.create)
router.get('/', checkRoleMiddleware("Руководитель"), taskController.getAllTasks)
router.get('/:id', authMiddleware, taskController.getTask)

module.exports = router