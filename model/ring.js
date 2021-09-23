/* indent size: 2 */

const {DataTypes} = require('sequelize');
const sequelize = require("../config/mysql2")

  const Model = sequelize.define('Ring', {
    item_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    owner_address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pet_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    initialCapital: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    multipe: {
      type: DataTypes.INTEGER(255),
      allowNull: true
    },
    max_jackpot: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    jackpot: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    count: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    backage_image: {
      type: DataTypes.INTEGER(255),
      allowNull: true
    },
    tickets: {
      type: DataTypes.INTEGER(255),
      allowNull: true
    },
    createTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    max_multipe: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    token_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    token_precision: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    }
  }, {
    tableName: 'ring',
    timestamps: false
  });

  module.exports = Model;