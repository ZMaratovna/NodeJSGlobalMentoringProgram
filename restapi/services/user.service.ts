import { v4 as uuid } from 'uuid';
import _ from 'lodash';

import { User, UserServiceInterface } from '../types';
import UserRepository from '../dal/user';

class UserService implements UserServiceInterface {
  private readonly repository: UserRepository;

  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  public find = async (userId: string): Promise<User | null> => {
    return this.repository.getUserById(userId)
    .then((user) => user);
  };

  public create = async (newUser: User): Promise<User | null > => {
    const {login} = newUser;
    return this.repository.getUserByLogin(login)
    .then((existedUser) => {
      if (existedUser) {
        return null;
      } else {
        const newUserWithId: User = {
          ...newUser,
          isDeleted: false,
          id: uuid(),
        };
        return this.repository.add(newUserWithId)
      }
  })
}

  public update = async (user: User): Promise<User | null> => {
    return this.repository.getUserById(user.id)
    .then ((userToUpdate) => {
      if (!userToUpdate) {
        return null;
      } else {
        const updatedUser: User = {
          ...userToUpdate,
          ...user
        };
        return this.repository.update(updatedUser);
      }
    })
    
  };

  public delete = async (id: string): Promise<User | null> => {
    return this.repository.remove(id)
    .then((removedUser) => removedUser);
  };

  public getAutoSuggestUsers = async (
    loginSubstring: string,
    limit: string | number
  ): Promise<User[] | null> => {
    if (limit && !isNaN(Number(limit))) {
      return this.repository.getUsers(loginSubstring, +limit)
      .then((users) => users);
      } else {
        return null;
      }
  }

  public getAll = async () => {
    return this.repository.getUsers() || [];
  }
}

export default new UserService(new UserRepository());
