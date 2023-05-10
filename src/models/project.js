'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.Company, {
        foreignKey: 'project_id'
      });
      Project.belongsToMany(models.User, { through: models.UserProject });
      Project.hasMany(models.UserProject);
      Project.hasMany(models.Task, {
        foreignKey: 'project_id', as: 'tasks'
      });   
      Project.hasMany(models.HistoryOfWork);
    }
  }
  Project.init({
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    project_name: DataTypes.STRING,
    project_description: DataTypes.TEXT,
    estimate_time: DataTypes.INTEGER,
    company_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};