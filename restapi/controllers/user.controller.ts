import {Request, Response} from 'express';

import { UserControllerInterface, User} from '../types';
import UserService from '../services/user.service';


class UserController implements UserControllerInterface {
    public find = async (req:Request, res: Response): Promise<void> => {
        const {id} = req.params;
        try {
            const foundUser : User | null = await UserService.find(id);
            if (foundUser) {
                res.status(200).send(foundUser);
            } else {
                res.status(404).send({error: 'user not found'});
            }
        } catch(e) {
            res.status(500).send(e)
        }
    };
    public create = async (req:Request, res: Response): Promise<void> => {
        const newUser = req.body;
        try {
            const createdUser : User | null = await UserService.create(newUser);
            if (createdUser) {
                res.status(201).send(createdUser);
            } else {
                res.status(200).send({error: 'user has already exists'})
            }
        } catch (e) {
            res.status(500).send(e);
        }
    };
    public update = async (req:Request, res: Response): Promise<void> => {
        const {id} = req.params;
    const infoToUpdate = req.body;
    try {
        const updatedUser: User | null = await UserService.update({id, ...infoToUpdate});
        if (updatedUser) {
            res.status(201).send(updatedUser);
        } else {
            res.status(404).send({error: 'no user to update'})
        }
        
    } catch (e) {
        res.status(500).send(e);
    }
    };
    public delete = async (req:Request, res: Response): Promise<void> => {
        const {id} = req.params;
        try {
            const user : User| null = await UserService.delete(id);
            if (user) {
                res.status(200).send(user);
            } else {
                res.status(404).send({error: 'no user to delete'});
            }
        } catch (e) {
            res.status(500).send(e);
        }
    };

    public getAutoSuggestUsers = async (req:Request, res: Response): Promise<void> => {
        try {
            const { loginSubstring, limit } = req.query;
            const users: User[] | null = loginSubstring
              ? await UserService.getAutoSuggestUsers(loginSubstring as string, limit as string)
              : await UserService.getAll();
              if (users) {
                  res.status(200).send(users);
              } else {
                  res.status(400).send({error: 'invalid query parameters'});
              }
          } catch (e) {
            res.status(500).send(e);
          }
    };

    public getAll = async (req:Request, res: Response): Promise<void>  => {
        try {
            const users: User[] = await UserService.getAll();
            res.status(200).send(users);
          } catch (e) {
            res.status(500).send(e);
          }
    }
}
const userController = new UserController();
export default userController;
