import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const AgentName = sequelize.define('AgentName', {
  name_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstname: { type: DataTypes.STRING, allowNull: false },
  lastname: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING(13), allowNull: false },
  pollingunit_uniqueid: { type: DataTypes.INTEGER, allowNull: false },
}, { tableName: 'agentname', timestamps: false });

export default AgentName;
