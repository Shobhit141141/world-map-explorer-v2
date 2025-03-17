import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './user';

class Log extends Model {
  public id!: number;
  public userId!: number;
  public logs!: Array<{
    timestamp: Date;
    locationName: string;
    locationCoordinates: { lat: number; lng: number };
  }>;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Log.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    logs: {
      type: DataTypes.JSONB, 
      defaultValue: [],
    },
  },
  {
    sequelize,
    modelName: 'log',
  },
);

export default Log;