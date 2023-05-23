'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Project extends Model {
        static associate(models) {
            // define association here
            Project.belongsTo(models.Company, { foreignKey: 'company_id' });
            Project.belongsToMany(models.User, { through: 'UserProjects', timestamps: false });
            //Project.hasMany(models.UserProject);
            Project.hasMany(models.Task, { foreignKey: 'project_id' });
            Project.hasMany(models.HistoryOfWork, { foreignKey: 'project_id' });
        }
    }
    Project.init({
        project_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true
            }
        },
        project_description: DataTypes.TEXT,
        estimate_time: {
            type: DataTypes.INTEGER,
            validate: {
                isNumeric: true
            }
        },
        // company_id: DataTypes.INTEGER
    }, {
        sequelize,
        underscored: true,
        paranoid: true,
        modelName: 'Project',
        tableName: 'Projects'
    });
    return Project;
};