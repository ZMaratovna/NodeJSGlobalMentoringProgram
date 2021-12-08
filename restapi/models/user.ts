import {Model, DataTypes} from 'sequelize';

import db from '../db/db';

export default class User extends Model {
    id!: string;
    login!: string;
    password!: string;
    age!: number;
    isDeleted!: boolean;
}
User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.SMALLINT,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize: db,
    tableName: 'users',
    timestamps: false
  });
