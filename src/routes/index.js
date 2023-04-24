const Router = require('express')
const router = new Router();
const projectsRouter = require('./projectsRouter')


router.use('/projects', projectsRouter)




module.exports = router

