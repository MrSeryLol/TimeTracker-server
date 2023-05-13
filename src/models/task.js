'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        static associate(models) {
            // define association here
            Task.belongsToMany(models.User, { through: 'UserTasks' });
            //Task.hasMany(models.User, { through: });
            Task.belongsTo(models.Project, { foreignKey: 'project_id' });
            Task.hasMany(models.HistoryOfWork);
        }
    }
    Task.init({
        task_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: true,
                len: [1, 255]
            }
        },
        task_description: DataTypes.TEXT,
        priority: DataTypes.ENUM('High', 'Medium', 'Low'),
        // project_id: DataTypes.INTEGER,
    }, {
        sequelize,
        underscored: true,
        paranoid: true,
        modelName: 'Task',
        tableName: 'Tasks'
    });
    return Task;
};