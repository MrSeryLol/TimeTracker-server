'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsToMany(models.User, { through: models.UserTask });
      Task.hasMany(models.UserTask);
      Task.belongsTo(models.Project, {foreignKey: 'project_id', as: 'tasks'});
      Task.hasMany(models.HistoryOfWork);
    }
  }
  Task.init({
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrementIdentity: true,
      primaryKey: true
    },
    task_name: DataTypes.TEXT,
    task_description: DataTypes.TEXT,
    priority: DataTypes.ENUM('High', 'Medium', 'Low'),
    project_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};