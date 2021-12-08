import {Op} from 'sequelize';
import { v4 as uuid } from 'uuid';

import {UserModel} from '../models';
import {User} from '../types';

export default class UserRepository {
    private readonly model = UserModel;

    add(user: User): Promise<User> {
        const {
          login, password, age,
        } = user;
    
        return this.model.create({
          id: uuid(),
          login,
          password,
          age,
          isDeleted: false
        }, {});
      }
    
      getUserByLogin(login: string): Promise<User|null> {
        return this.model.findOne({
          where: {
            login,
          },
        });
      }
    
      getUsers(substr?: string, limit?: number): Promise<User[]> {
        let substrClause = {};
        const deletedClause = {
          isDeleted: {
            [Op.eq]: false,
          },
        };
    
        if (substr) {
          substrClause = {
            login: {
              [Op.like]: `%${substr}%`
            }
          };
          // whereClause = {
          //   ...whereClause,
          //   login: {
          //     [Op.like]: `%${substr}%`,
          //   },
          // };
        }
    
        return this.model.findAll({
          where: {
            [Op.and]: {
              ...deletedClause,
              ...substrClause
            }
          },
          limit,
        });
      }
    
      getUserById(id: string): Promise<User | null> {
        return this.model.findOne({
          where: {
            id,
          },
        });
      }
    
      async update(user: User): Promise<User | null> {
        const {
          id, login, password, age,
        } = user;
    
        return this.model.update({
          login,
          password,
          age,
        }, {
          where: {
            id,
          },
          returning: true,
        }).then(([number, updatedUsers]) => number ? updatedUsers[0] : null);
      }
    
      remove(id: string): Promise<User | null> {
        return this.model.update({
          isDeleted: true,
        }, {
          where: {
            id,
          },
          returning: true,
        }).then(([number, updatedUsers]) => number ? updatedUsers[0] : null);
      }
}
