import {Model, DataTypes} from 'sequelize';

import {Permission} from '../types'
import db from '../db/db';

export default class Group extends Model {
    id!: string;
    name!: string;
    permissions!:Array<Permission>
}
Group.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    permissions: {
      type: DataTypes.ARRAY(DataTypes.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')),
      defaultValue: ['READ'],
    },
  }, {
    sequelize: db,
    tableName: 'groups', 
    timestamps: false
  });
