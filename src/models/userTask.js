'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserTask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserTask.belongsTo(models.User);
      UserTask.belongsTo(models.Task);
    }
  }
  UserTask.init({
    user_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    task_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'UserTask',
  });
  return UserTask;
};