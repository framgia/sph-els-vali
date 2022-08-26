'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserAnswer.belongsToMany(models.Quiz, {through:models.Question})
    }
  }
  UserAnswer.init({
    user_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER,
    user_answer: DataTypes.STRING,
    user_lesson_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserAnswer',
  });
  return UserAnswer;
};