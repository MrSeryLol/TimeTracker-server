'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class HistoryOfWork extends Model {
        static associate(models) {
            // define association here
            HistoryOfWork.belongsTo(models.Project, { foreignKey: 'project_id' });
            HistoryOfWork.belongsTo(models.Task, { foreignKey: 'task_id' });
            HistoryOfWork.belongsTo(models.User, { foreignKey: 'user_id'});
        }
    }
    HistoryOfWork.init({
        starting_time: DataTypes.DATE,
        ending_time: DataTypes.DATE,
        efficient_time: DataTypes.INTEGER,
        date: DataTypes.DATEONLY,
        // project_id: DataTypes.INTEGER,
        // task_id: DataTypes.INTEGER,
        // user_id: DataTypes.INTEGER
    }, {
        sequelize,
        underscored: true,
        paranoid: true,
        modelName: 'HistoryOfWork',
        tableName: 'HistoryOfWorks'
    });
    return HistoryOfWork;
};