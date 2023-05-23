const Router = require('express')
const router = new Router();
const projectsController = require('../controllers/projectsController')
const authMiddleware = require('../middleware/authMiddleware');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

router.get('/', authMiddleware, projectsController.getAllProjects)
router.post('/', checkRoleMiddleware('Руководитель'), projectsController.create)
router.get('/userProjects/:user_id', authMiddleware, projectsController.getAllProjectsForEmployee)
router.get('/:id', authMiddleware, projectsController.getOneProject)

module.exports = router