import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const AnnouncedWardResult = sequelize.define('AnnouncedWardResult', {
  result_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ward_name: { type: DataTypes.STRING(50), allowNull: false },
  party_abbreviation: { type: DataTypes.STRING(4), allowNull: false },
  party_score: { type: DataTypes.INTEGER, allowNull: false },
  entered_by_user: { type: DataTypes.STRING(50), allowNull: false },
  date_entered: { type: DataTypes.DATE, allowNull: false },
  user_ip_address: { type: DataTypes.STRING(50), allowNull: false },
}, {
  tableName: 'announced_ward_results',
  timestamps: false
});

export default AnnouncedWardResult;
