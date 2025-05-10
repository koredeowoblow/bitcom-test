import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Party = sequelize.define('Party', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  partyid: { type: DataTypes.STRING(11), allowNull: false },
  partyname: { type: DataTypes.STRING(11), allowNull: false },
}, {
  tableName: 'party',
  timestamps: false
});

export default Party;
