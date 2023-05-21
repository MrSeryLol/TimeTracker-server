const Router = require('express')
const router = new Router();
const projectsRouter = require('./projectsRouter')
const authRouter = require('./authRouter')
const historyOfWorkRouter = require('./historyOfWorkRouter')
const employeeRouter = require('./employeeRouter')
const taskRouter = require('./taskRouter')

router.use('/projects', projectsRouter)
router.use('/tasks', taskRouter)
router.use('/auth', authRouter)
router.use('/history', historyOfWorkRouter)
router.use('/employees', employeeRouter)

module.exports = router
