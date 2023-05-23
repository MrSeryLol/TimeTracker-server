const ErrorAPI = require('../error/errorAPI')
const {HistoryOfWork, User, Task, sequelize} = require('../models')

class HistoryOfWorkController {
    async saveActivity(req, res, next) {
        try {
            const { user_id, task_id, project_id, starting_time, 
                ending_time, efficient_time, date } = req.body

            const result = await sequelize.transaction(async (transaction) => {
                const userTask = await User.findOne({
                    attributes: [['id', 'user_id']],
                    where: { id: user_id },
                    include: {
                        attributes: [['id', 'task_id']],
                        model: Task,
                        through: { attributes: [] },
                        where: { id: task_id },
                        required: true,
                    }
                }, { transaction: transaction })

                console.log(userTask)

                if (!userTask) {
                    const employee = await User.findOne({
                        attributes: ['id'],
                        where: { id: user_id }
                    }, { transaction: transaction })

                    await employee.addTask(task_id, { transaction: transaction })
                }

                const newHistoryLog = await HistoryOfWork.create({
                    starting_time: starting_time,
                    ending_time: ending_time,
                    efficient_time: efficient_time,
                    date: date,
                    created_at: new Date(),
                    updated_at: new Date(),
                    project_id: project_id,
                    task_id: task_id,
                    user_id: user_id
                }, { transaction: transaction })
                return res.json({ message: "Информация о работе успешно сохранена! "})
            })
        } catch (err) {
            console.log(err)
            next(ErrorAPI.badRequest("Не удалось сохранить информацию о работе"))
        }

    }
}

module.exports = new HistoryOfWorkController()