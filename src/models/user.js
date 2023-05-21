'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define association here
            User.belongsToMany(models.Role, { through: 'UserRoles', timestamps: false });
            //models.Role.belongsToMany(User, { through: 'UserRoles', as: 'Users' })
            //User.hasMany(models.UserRole);
            User.belongsTo(models.Company, { foreignKey: 'company_id' });
            User.belongsToMany(models.Project, { through: 'UserProjects', timestamps: false });
            //User.hasMany(models.UserProject);
            User.belongsToMany(models.Task, { through: 'UserTasks' });
            // User.hasMany(models.UserTask);
            User.hasMany(models.HistoryOfWork);
        }
    }
    User.init({
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                len: [3, 255]
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                len: [3, 255]
            }
        },
        patronomyc: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                len: [3, 255]
            }
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                len: [3, 255],
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                len: [3, 255],
            }
        }
    }, {
        sequelize,
        underscored: true,
        paranoid: true,
        modelName: 'User',
        tableName: 'Users'
    });
    return User;
};