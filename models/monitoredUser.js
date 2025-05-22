const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MonitoredUser = sequelize.define('MonitoredUser', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: true  // creează doar createdAt și updatedAt
});

module.exports = MonitoredUser;
