import { v4 as uuid } from 'uuid';
import _ from 'lodash';

import { User, UserServiceInterface, ErrorMessage } from '../types';

class UserService implements UserServiceInterface {
  private usersStore: User[] = [
    {
      id: '6537bbb2-2cf6-475c-bfdb-e0f711922488',
      login: 'zhanna@epam.com',
      age: 99,
      password: 'zhanna',
      isDeleted: false,
    },
    {
      id: '6537bbb2-2cf6-475c-bfdb-e0f711922405',
      login: 'oleg@epam.com',
      age: 10,
      password: 'his_Majesty_oleg_666',
      isDeleted: false,
    },
    {
      id: 'b6623083-0d80-4f86-b37e-6bc556d61a51',
      login: 'valera@epam.com',
      age: 180,
      password: 'valera_is_the_best_1',
      isDeleted: false,
    },
    {
      id: '45623083-0d80-4f86-b37e-6bc556d61a34',
      login: 'petya@epam.com',
      age: 21,
      password: 'petya_is_here_99',
      isDeleted: false,
    },
  ];

  private updateUsersStore(idx: number, user: User): void {
    this.usersStore = [
      ...this.usersStore.slice(0, idx),
      user,
      ...this.usersStore.slice(idx + 1),
    ];
  }

  private checkDuplicates(users: User[], newUser: User): boolean {
    const duplicatedUser =  users.find((user: User) => user.login === newUser.login);
    return !!duplicatedUser;
  }

  public find = async (userId: string): Promise<User | ErrorMessage> => {
    const foundUser: User | undefined = this.usersStore.find(({id}) => id === userId);
    if (!foundUser) {
      return {error: true, message: 'User not found'};
    }
    return foundUser;
  };

  public create = async (newUser: User): Promise<User | ErrorMessage> => {
    if (!this.checkDuplicates(this.usersStore, newUser)) {
        const user: User = {
        ...newUser,
        id: uuid(),
        };
      this.usersStore.push(user);
      return user;
    } else {
        return { error: true, message: 'User with this login has already exists'}
    }
  };

  public update = async (id: string, userInfoToUpdate: User): Promise<User | ErrorMessage> => {
    const userIndex: number = this.usersStore.findIndex((u) => u.id === id);
    const userToUpdate = this.usersStore[userIndex];
    if (!userToUpdate) {
      return {error: true, message: 'No user found to update'};
    }
    const updatedUser: User = {
      ...userToUpdate,
      ...userInfoToUpdate
    };
    this.updateUsersStore(userIndex, updatedUser);
    return updatedUser;
  };

  public delete = async (id: string): Promise<void | ErrorMessage> => {
    const userIndex: number = this.usersStore.findIndex((u) => u.id === id);
    const userToDelete = this.usersStore[userIndex];
    if (!userToDelete) {
      return {error: true, message: 'No user found to delete'};
    } else {
      this.updateUsersStore(
          userIndex, 
          {
          ...userToDelete,
          isDeleted: true
          }
      );
    }
  };

  public getAutoSuggestUsers = async (
    loginSubstring: string,
    limit: string | number
  ): Promise<User[] | ErrorMessage> => {
    if (limit && !isNaN(Number(limit))) {
      return this.usersStore
        .filter((u: User) => u.login.includes(loginSubstring))
        .slice(0, Number(limit) || this.usersStore.length)
        .sort((uA: User, uB: User) => uA.login.localeCompare(uB.login));
      } else {
        return {error: true, message: 'Invalid query parameters'};
      }
  }

  public getAll = async () => {
    return this.usersStore || [];
  }
}

const usersStore = new UserService();
export default usersStore;
