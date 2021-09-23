/* indent size: 2 */
const {DataTypes} = require('sequelize');
const sequelize = require("../config/mysql2")

  const Model = sequelize.define('Message', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    is_read: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    message: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    event_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'message',
    timestamps: false
  });
  module.exports = Model;
