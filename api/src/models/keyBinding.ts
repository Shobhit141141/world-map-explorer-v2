// models/keyBinding.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import User from './user';
import { KEY_BINDING_ACTIONS } from '../config/enums';

class KeyBinding extends Model {
  public id!: number;
  public userId!: number;
  public key!: string;
  public action!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

KeyBinding.init(
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
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      validate: {
        isIn: [KEY_BINDING_ACTIONS],
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'keyBinding',
  }
);

export default KeyBinding;