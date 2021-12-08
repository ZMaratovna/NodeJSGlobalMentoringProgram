import {Request, Response} from 'express';

import { GroupControllerInterface, Group} from '../types';
import GroupService from '../services/group.service';


class GroupController implements GroupControllerInterface {
    public find = async (req:Request, res: Response): Promise<void> => {
        const {id} = req.params;
        try {
            const foundGroup : Group | null = await GroupService.find(id);
            if (foundGroup) {
                res.sendStatus(200).send(foundGroup);
            } else {
                res.sendStatus(404).send({error: 'group not found'});
            }
        } catch(e) {
            res.sendStatus(500).send(e)
        }
    };
    public create = async (req:Request, res: Response): Promise<void> => {
        const newGroup = req.body;
        try {
            const createdGroup : Group | null = await GroupService.create(newGroup);
            if (createdGroup) {
                res.sendStatus(201).send(createdGroup);
            } else {
                res.sendStatus(200).send({error: 'group has already exists'})
            }
        } catch (e) {
            res.sendStatus(500).send(e);
        }
    };
    public update = async (req:Request, res: Response): Promise<void> => {
        const {id} = req.params;
    const infoToUpdate = req.body;
    try {
        const updatedGroup: Group | null = await GroupService.update({id, ...infoToUpdate});
        if (updatedGroup) {
            res.sendStatus(201).send(updatedGroup);
        } else {
            res.sendStatus(404).send({error: 'no group to update'})
        }
        
    } catch (e) {
        res.sendStatus(500).send(e);
    }
    };
    public delete = async (req:Request, res: Response): Promise<void> => {
        const {id} = req.params;
        try {
            const group : number = await GroupService.delete(id);
            res.sendStatus(200).send(group);
        } catch (e) {
            res.sendStatus(500).send(e);
        }
    };

    public getAll = async (req:Request, res: Response): Promise<void>  => {
        try {
            const groups: Group[] = await GroupService.getAll();
            res.sendStatus(200).send(groups);
          } catch (e) {
            res.sendStatus(500).send(e);
          }
    }
    public addUsers = async ({body}:Request, res: Response): Promise<void>  => {
        try {
            const {userIds, groupId} = body;
            const count: number = await GroupService.addUsers(userIds, groupId);
            res.sendStatus(200).send(count);
          } catch (e) {
            res.sendStatus(500).send(e);
          }
    }
}
const groupController = new GroupController();
export default groupController;
