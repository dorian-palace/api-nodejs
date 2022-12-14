'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.Groupe, {
        foreignKey: {
          allowNull: false
        }
      })
    }
  }
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    idGroup: {
      type : DataTypes.INTEGER,
      required: true,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};