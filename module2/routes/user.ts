import express from 'express';

import UserController from '../controllers/user.controller';
import {userValidator} from '../middlewares/userValidator';

const userRouter = express.Router();

userRouter.get('/', UserController.getAutoSuggestUsers);
userRouter.get('/:id', UserController.find);
userRouter.post('/', userValidator, UserController.create);
userRouter.put('/:id', userValidator, UserController.update);
userRouter.delete('/:id', UserController.delete);

export default userRouter;
