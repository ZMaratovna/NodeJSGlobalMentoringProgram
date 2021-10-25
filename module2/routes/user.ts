import express, {Response, Request} from 'express';

import UserService from '../services/user.service';
import {User, ErrorMessage} from '../types';
import {userValidator} from '../middlewares/userValidator';

const userRouter = express.Router();

userRouter.get('/', async (req: Request, res: Response) => {
    try {
      const { loginSubstring, limit } = req.query;
      const users: User[] | ErrorMessage = loginSubstring
        ? await UserService.getAutoSuggestUsers(loginSubstring as string, limit as string)
        : await UserService.getAll();
        const queryParamsError = users as ErrorMessage;
        if (queryParamsError.error) {
            res.status(200).send({error: queryParamsError.message});
        } else {
            res.status(200).send(users);
        }
    } catch (e) {
      res.status(404).send(e);
    }
  });

userRouter.get('/:id', async (req:Request, res: Response) => {
    const {id} = req.params;
    try {
        const foundUser : User | ErrorMessage = await UserService.find(id);
        const user = foundUser as User;
        const notFoundError = foundUser as ErrorMessage;
        if (user.id) {
            res.status(200).send(foundUser);
        } else if (notFoundError.error) {
            res.status(200).send({error: notFoundError.message});
        }
    } catch(e) {
        res.status(200).send(e)
    }
});

userRouter.post('/', userValidator, async (req: Request, res: Response) => {
    const newUser = req.body;
    try {
        const createdUser : User | ErrorMessage = await UserService.create(newUser);
        const user = createdUser as User;
        const duplicateError = createdUser as ErrorMessage;
        if (user.id) {
            res.status(201).send(createdUser);
        } else if (duplicateError.error) {
            res.status(200).send({error: duplicateError.message})
        }
    } catch (e) {
        res.status(200).send(e);
    }
});

userRouter.put('/:id', userValidator, async (req: Request, res: Response) => {
    const {id} = req.params;
    const infoToUpdate = req.body;
    try {
        const updatedUser: User | ErrorMessage = await UserService.update(id, infoToUpdate);
        const user = updatedUser as User;
        const updatingError = updatedUser as ErrorMessage;
        if (user.id) {
            res.status(201).send(updatedUser);
        } else if (updatingError.error) {
            res.status(200).send({error: updatingError.message})
        }
        
    } catch (e) {
        res.status(200).send(e);
    }
});
userRouter.delete('/:id', async (req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const result : ErrorMessage | void = await UserService.delete(id);
        const removingError = result as ErrorMessage;
        if (removingError.error) {
            res.status(200).send({error: removingError.message});
        } else {
            res.status(200).send();
        }
    } catch (e) {
        res.status(200).send(e);
    }
});

export default userRouter;
