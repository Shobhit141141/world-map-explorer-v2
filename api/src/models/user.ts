import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import Bookmark from './bookmark';
import KeyBinding from './keyBinding';
import Settings from './settings';

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'user',
  },
);

User.hasMany(Bookmark, { foreignKey: 'userId', as: 'bookmarks', onDelete: 'CASCADE' });
Bookmark.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(KeyBinding, { foreignKey: 'userId', as: 'keyBindings', onDelete: 'CASCADE' });
KeyBinding.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasOne(Settings, { foreignKey: 'userId', as: 'settings', onDelete: 'CASCADE' });
Settings.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default User;
