import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const State = sequelize.define('State', {
  state_id: { type: DataTypes.INTEGER, primaryKey: true },
  state_name: { type: DataTypes.STRING(50), allowNull: false },
}, {
  tableName: 'states',
  timestamps: false
});

export default State;
