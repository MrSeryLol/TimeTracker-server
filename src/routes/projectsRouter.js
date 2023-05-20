const Router = require('express')
const router = new Router();
const projectsController = require('../controllers/projectsController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, projectsController.getAllProjects)
router.get('/:id', authMiddleware, projectsController.getOneProject)

module.exports = router