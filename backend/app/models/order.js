// app/models/order.js
// order model

'use strict';

const Sequelize = require('sequelize');
const db = require('../services/database');

// 1: Model Schema; - define the the schema of table 'orders'
// By default, column "id" will be automatlly created as Primary Key
const modelDefinition = {
  userEmail: {
    type: Sequelize.STRING,
    allowNull: false
  },

  deliveryAddress: {
    type: Sequelize.STRING,
    allowNull: false
  },

  items: {
    type: Sequelize.STRING,
    allowNull: false
  },

  instructions: {
    type: Sequelize.STRING,
    allowNull: true
  }
};

const modelOptions = {
  timestamps: false
};

const OrderModel = db.define('order', modelDefinition, modelOptions);

// set up foreign key
OrderModel.associate = function(models) {
  // console.log('[DEBUG]: create foreign key');
  OrderModel.belongsTo(models.user, {foreignKey: 'userEmail'});
};


module.exports = OrderModel;
