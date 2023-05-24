'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Company extends Model {
        static associate(models) {
            // define association here
            Company.hasMany(models.User, { foreignKey: 'company_id' });
            Company.hasMany(models.Project, { foreignKey: 'company_id'});
            Company.hasMany(models.Task, { foreignKey: 'company_id' })
        }
    }
    Company.init({
        company_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true
            }
        }
    }, {
        sequelize,
        underscored: true,
        paranoid: true,
        modelName: 'Company',
        tableName: 'Companies'
    });
    return Company;
};