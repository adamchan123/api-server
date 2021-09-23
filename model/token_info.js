/* indent size: 2 */
const {DataTypes} = require('sequelize');
const sequelize = require("../config/mysql2")

  const Model = sequelize.define('TokenInfo', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    chainid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    token_address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    token_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cretae_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    precision: {
      type: DataTypes.INTEGER(5),
      allowNull: true
    }
  }, {
    tableName: 'token_info',
    timestamps: false
  });

  module.exports = Model;