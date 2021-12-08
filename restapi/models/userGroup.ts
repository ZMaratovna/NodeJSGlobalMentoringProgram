import { Model, DataTypes } from "sequelize";

import db from "../db/db";

export default class UserGroup extends Model {
    userId!: string;
    groupId!: string;
  }

  UserGroup.init({
    userId: DataTypes.UUID,
    groupId: DataTypes.UUID,
  }, {
    sequelize: db,
    tableName: 'users_groups',
    timestamps: false
  });
