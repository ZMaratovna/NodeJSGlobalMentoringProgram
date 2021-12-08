import express from 'express';

import GroupController from '../controllers/group.controller';


const groupRouter = express.Router();

groupRouter.get('/', GroupController.getAll);
groupRouter.get('/:id', GroupController.find);
groupRouter.post('/', GroupController.create);
groupRouter.post('/users', GroupController.addUsers);
groupRouter.put('/:id', GroupController.update);
groupRouter.delete('/:id', GroupController.delete);

export default groupRouter;
