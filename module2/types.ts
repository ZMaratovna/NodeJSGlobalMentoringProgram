import {Request, Response} from 'express';

type ControllerMethod = (req:Request, res: Response) =>  Promise<void>;
export interface User {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export interface UserServiceInterface {
    find(id: string): Promise<User | null>;
    create(newUser: User): Promise<User | null>;
    update(id: string, updatedUser: User): Promise<User | null>;
    delete(id: string): Promise<string | null>;
    getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<User[] | null>;
    getAll(): Promise<User[]>;
}
export interface UserControllerInterface {
    find: ControllerMethod;
    create:ControllerMethod;
    update:ControllerMethod;
    delete: ControllerMethod
    getAutoSuggestUsers: ControllerMethod;
    getAll: ControllerMethod;
}
