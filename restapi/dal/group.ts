import { v4 as uuid } from 'uuid';

import {GroupModel, UserGroupModel} from '../models';
import {Group, UserGroup} from '../types';
import db from '../db/db';

export default class GroupRepository {
    private readonly model = GroupModel;
    private readonly userGroupModel = UserGroupModel;

    add(group: Group): Promise<Group> {
        const {
          name, permissions
        } = group;
        return this.model.create({
          id: uuid(),
          name,
          permissions
        }, {});
      }
    
      getGroups(): Promise<Group[]> {
        return this.model.findAll();
      }
    
      getGroupById(id: string): Promise<Group | null> {
        return this.model.findOne({
          where: {
            id,
          },
        });
      }
    
      async update(user: Group): Promise<Group | null> {
        const {
          id, name, permissions
        } = user;
    
        return this.model.update({
          name,
          permissions
        }, {
          where: {
            id,
          },
          returning: true,
        }).then(([number, updatedGroups]) => number ? updatedGroups[0] : null);
      }
    
      remove(id: string): Promise<number> {
        return this.model.destroy({
          where: {
            id,
          }
        });
      }
      addUsers(userIds: string[], groupId: string): Promise<number> {
        return db.transaction((transaction) => {
            const bulk: Promise<UserGroup>[] = [];
      
            userIds.forEach((userId) => {
              bulk.push(this.userGroupModel.create({
                groupId,
                userId,
              }, { transaction }));
            });
      
            return Promise.all(bulk).then((res) => {
                return res.length
            });
          });
      }
}
