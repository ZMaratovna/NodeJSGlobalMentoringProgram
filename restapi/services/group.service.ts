import { v4 as uuid } from 'uuid';
import _ from 'lodash';

import {Group, GroupServiceInterface} from '../types';
import GroupRepository from '../dal/group';

class GroupService implements GroupServiceInterface {
  private readonly repository: GroupRepository;

  constructor(repository: GroupRepository) {
    this.repository = repository;
  }

  public find = async (groupId: string): Promise<Group | null> => {
    return this.repository.getGroupById(groupId)
    .then((group) => group);
  };

  public create = async (newGroup: Group): Promise<Group | null > => {
    const newGroupWithId = {
      ...newGroup,
      id: uuid()
    };
    return this.repository.add(newGroupWithId);
  }

  public update = async (group: Group): Promise<Group | null> => {
    return this.repository.getGroupById(group.id)
    .then ((groupToUpdate) => {
      if (!groupToUpdate) {
        return null;
      } else {
        const updatedGroup: Group = {
          ...groupToUpdate,
          ...group
        };
        return this.repository.update(updatedGroup);
      }
    })
    
  };

  public delete = async (id: string): Promise<number> => {
    return this.repository.remove(id);
  };

  public getAll = async () => {
    return this.repository.getGroups() || [];
  }
  public addUsers = async (userIds: string[], groupId: string) => {
    return this.repository.addUsers(userIds, groupId);
  }
}

export default new GroupService(new GroupRepository());
