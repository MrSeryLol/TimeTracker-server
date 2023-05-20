const ErrorAPI = require("../error/errorAPI")
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return next(ErrorAPI.unauthorized('Пользователь не авторизован!'))
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.userInfo = decoded
        next()
        
    } catch(err) {
        next(ErrorAPI.unauthorized(`${err.message} пользователь не авторизован!`))
    }
}