'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistoryOfWork extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HistoryOfWork.belongsTo(models.Project);
      HistoryOfWork.belongsTo(models.Task);
      HistoryOfWork.belongsTo(models.User);
    }
  }
  HistoryOfWork.init({
    history_id: DataTypes.INTEGER,
    starting_time: DataTypes.DATE,
    ending_time: DataTypes.DATE,
    efficient_time: DataTypes.TIME,
    unefficient_time: DataTypes.TIME,
    date: DataTypes.DATEONLY,
    is_being_late: DataTypes.BOOLEAN,
    is_early_finished: DataTypes.BOOLEAN,
    project_id: DataTypes.INTEGER,
    task_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HistoryOfWork',
  });
  return HistoryOfWork;
};