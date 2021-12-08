import { BelongsToManyOptions } from 'sequelize';

import GroupModel from './group';
import UserModel from './user';
import UserGroupModel from './userGroup';


GroupModel.belongsToMany(UserModel, {
  through: UserGroupModel,
  foreignKey: 'groupId',
  onDelete: 'CASCADE',
} as BelongsToManyOptions);

UserModel.belongsToMany(GroupModel, {
  through: UserGroupModel,
  foreignKey: 'userId',
  onDelete: 'CASCADE',
} as BelongsToManyOptions);

UserModel.sync();
GroupModel.sync();
UserGroupModel.sync();

export {
  UserModel,
  GroupModel,
  UserGroupModel,
};
