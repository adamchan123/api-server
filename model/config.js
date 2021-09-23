/* indent size: 2 */
const {DataTypes} = require('sequelize');
const sequelize = require("../config/mysql2")

  const Model = sequelize.define('Config', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    config_key: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    config_value: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'config',
    timestamps: false
  });
  module.exports = Model;