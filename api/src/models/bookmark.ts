import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './user';

class Bookmark extends Model {
  public id!: number;
  public userId!: number;
  public name!: string;
  public coordinates!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Bookmark.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coordinates: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'bookmark',
  },
);


export default Bookmark;
