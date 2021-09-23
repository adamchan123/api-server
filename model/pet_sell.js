/* indent size: 2 */

const {DataTypes} = require('sequelize');
const sequelize = require("../config/mysql2")

  const Model = sequelize.define('PetSell', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    pet_id: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    pet_image: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    },
    current: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    current_contract: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    sell_account: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    create_time: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    tx_hash: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    current_precision: {
      type: DataTypes.INTEGER(255),
      allowNull: true
    }
  }, {
    tableName: 'pet_sell',
    timestamps: false
  });
  module.exports = Model;