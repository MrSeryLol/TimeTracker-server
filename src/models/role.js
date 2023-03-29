'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.belongsToMany(models.User, { through: models.UserRole });
      Role.hasMany(models.UserRole);
    }
  }
  Role.init({
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrementIdentity: true
    },
    role: DataTypes.ENUM('Supervisor', 'Employee')
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};