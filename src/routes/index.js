const Router = require('express')
const router = new Router();
const projectsRouter = require('./projectsRouter')
const authRouter = require('./authRouter')


router.use('/projects', projectsRouter)
router.use('/auth', authRouter)




module.exports = router

