const Router = require('express')
const router = new Router();
const employeeController = require('../controllers/employeeController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/', authMiddleware, employeeController.getAllEmployeesByCompany)
router.get('/:id', authMiddleware, employeeController.getOneEmployee)
router.get('/:id/activity', authMiddleware, employeeController.getEmployeeActivity)
router.post('/', checkRoleMiddleware("Руководитель"), employeeController.create)
router.post('/addToProject', checkRoleMiddleware("Руководитель"), employeeController.addEmployeeToProject)
router.post('/:id/activity/', authMiddleware, employeeController.getEmployeeTask)

module.exports = router