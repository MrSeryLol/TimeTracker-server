'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // define association here
      Role.belongsToMany(models.User, { through: 'UserRoles', timestamps: false });
      //Role.hasMany(models.UserRole);
    }
  }
  Role.init({
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: true
        }
    }
  }, {
    sequelize,
    underscored: true,
    paranoid: true,
    modelName: 'Role',
    tableName: 'Roles'
  });
  return Role;
};