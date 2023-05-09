const ErrorAPI = require('../error/errorAPI')
const {User, Role} = require('../models')
const bcrypt = require('bcrypt')

class AuthController {
    async registration(req, res, next) {
        try {
            const {email, password} = req.body
            const candidate = await User.findOne({
                where: {
                    login: email
                }
            })
            if (candidate) {
                return next(ErrorAPI.badRequest('Такой пользователь уже существует'))
            }

            // const user = 

        } catch (err) {
            console.log(err)
            next(ErrorAPI.badRequest('Какая-то ошибка'))
        }

    } 

    async login(req, res) {

    }
}

module.exports = new AuthController()