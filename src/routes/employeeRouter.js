const Router = require('express')
const router = new Router();
const employeeController = require('../controllers/employeeController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.get('/', authMiddleware, employeeController.getAllEmployeesByCompany)
router.post('/', checkRoleMiddleware("Руководитель"), employeeController.create)

module.exports = router