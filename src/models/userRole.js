'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class UserRole extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            UserRole.belongsTo(models.User, {foreignKey: {name: 'user_id'}});
            UserRole.belongsTo(models.Role, {foreignKey: {name: 'role_id'}});
        }
    }
    UserRole.init({
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Users',
                key: 'user_id'
            }
        },
        role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Roles',
                key: 'role_id'
            }
        },
    }, {
        sequelize,
        modelName: 'UserRole',
    });
    return UserRole;
};