'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Role, { through: models.UserRole });
      User.hasMany(models.UserRole);
      User.belongsTo(models.Company, {foreignKey: 'company_id'});
      User.belongsToMany(models.Project, { through: models.UserProject });
      User.hasMany(models.UserProject);
      User.belongsToMany(models.Task, { through: models.UserTask });
      User.hasMany(models.UserTask);
      User.hasMany(models.HistoryOfWork);
    }
  }
  User.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    patronomyc: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    company_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};