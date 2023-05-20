const ErrorAPI = require('../error/errorAPI')
const { User, Role, Company, sequelize } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateAccessToken = (user_id, role, company_id, company_name) => {
    const payload = {
        user_id, 
        role,
        company_id,
        company_name
    }
    return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class AuthController {
    async registration(req, res, next) {
        try {
            const result = await sequelize.transaction(async (transaction) => {
                const { first_name, last_name, patronomyc, login, password, company_name } = req.body
                const candidate = await User.findOne({
                    where: {
                        login: login
                    }
                }, { transaction: transaction })
                if (candidate) {
                    return next(ErrorAPI.badRequest('Такой пользователь уже существует'))
                }

                const hashPassword = bcrypt.hashSync(password, 7)
                const role = await Role.findOne({
                    where: {
                        role: "Руководитель"
                    }
                })

                const user = await User.create({
                    first_name: first_name,
                    last_name: last_name,
                    patronomyc: patronomyc,
                    login: login,
                    password: hashPassword,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    Company: {
                        company_name: company_name,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    }
                }, {
                    include: {
                        model: Company
                    }
                }, { transaction: transaction });

                await user.addRole(role.id, { transaction: transaction });

                return res.json({ user })
            })
        } catch (err) {
            next(ErrorAPI.badRequest(err.message))
        }
    }
    async login(req, res, next) {
        try {
            const { login, password } = req.body
            const user = await User.findOne({
                where: {
                    login: login
                }
            })
            if (!user) {
                return next(ErrorAPI.badRequest("Пользователь не найден"))
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return next(ErrorAPI.badRequest("Введён неверный пароль"))
            }

            const role = await Role.findOne({
                attributes: ['role'],
                include: { 
                    model: User,
                },
            })

            const company = await Company.findOne({
                attributes: ['id', 'company_name'],
                include: {
                    model: User
                }
            })
            const token = generateAccessToken(user.id, role.role, company.id, company.company_name)

            return res.json({token})

        } catch(err) {
            next(ErrorAPI.badRequest(err.message))
        }
    }
}

module.exports = new AuthController()