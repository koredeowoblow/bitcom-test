import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const LGA = sequelize.define('LGA', {
  uniqueid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  lga_id: { type: DataTypes.INTEGER, allowNull: false },
  lga_name: { type: DataTypes.STRING(50), allowNull: false },
  state_id: { type: DataTypes.INTEGER, allowNull: false },
  lga_description: { type: DataTypes.TEXT },
  entered_by_user: { type: DataTypes.STRING(50), allowNull: false },
  date_entered: { type: DataTypes.DATE, allowNull: false },
  user_ip_address: { type: DataTypes.STRING(50), allowNull: false },
}, {
  tableName: 'lga',
  timestamps: false
});

export default LGA;
