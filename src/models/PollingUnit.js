import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const PollingUnit = sequelize.define('PollingUnit', {
  uniqueid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  polling_unit_id: { type: DataTypes.INTEGER, allowNull: false },
  ward_id: { type: DataTypes.INTEGER, allowNull: false },
  lga_id: { type: DataTypes.INTEGER, allowNull: false },
  uniquewardid: { type: DataTypes.INTEGER },
  polling_unit_number: { type: DataTypes.STRING(50) },
  polling_unit_name: { type: DataTypes.STRING(50) },
  polling_unit_description: { type: DataTypes.TEXT },
  lat: { type: DataTypes.STRING },
  long: { type: DataTypes.STRING },
  entered_by_user: { type: DataTypes.STRING(50) },
  date_entered: { type: DataTypes.DATE },
  user_ip_address: { type: DataTypes.STRING(50) },
}, {
  tableName: 'polling_unit',
  timestamps: false
});

export default PollingUnit;
