'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserLesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserLesson.belongsTo(models.User)
      UserLesson.hasMany(models.Quiz)
    }
  }
  UserLesson.init({
    user_id: DataTypes.INTEGER,
    quiz_id: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserLesson',
  });
  return UserLesson;
};
