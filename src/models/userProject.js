'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProject.belongsTo(models.User);
      UserProject.belongsTo(models.Project);
    }
  }
  UserProject.init({
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    project_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'UserProject',
  });
  return UserProject;
};