const Router = require('express')
const router = new Router();
const projectsRouter = require('./projectsRouter')
const authRouter = require('./authRouter')
const historyOfWorkRouter = require('./historyOfWorkRouter')
const employeeRouter = require('./employeeRouter')

router.use('/projects', projectsRouter)
router.use('/auth', authRouter)
router.use('/history', historyOfWorkRouter)
router.use('/employees', employeeRouter)

module.exports = router
