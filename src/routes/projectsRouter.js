const Router = require('express')
const router = new Router();
const projectsController = require('../controllers/projectsController')

router.get('/', projectsController.getAllProject)
router.get('/:id', projectsController.getOneProject)




module.exports = router