import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './user';

class Settings extends Model {
  public id!: number;
  public userId!: number;
  public cursorSize!: number;
  public cursorAngle!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Settings.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    cursorSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },
    cursorAngle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'settings',
  }
);

export default Settings;