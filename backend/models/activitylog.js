"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ActivityLog extends Model {
    static associate(models) {
      ActivityLog.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }
  ActivityLog.init(
    {
      relatable_id: DataTypes.INTEGER,
      relatable_type: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ActivityLog",
    }
  );
  return ActivityLog;
};
