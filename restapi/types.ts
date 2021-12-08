import {Request, Response} from 'express';

type ControllerMethod = (req:Request, res: Response) =>  Promise<void>;
export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface User {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export type Group = {
    id: string;
    name: string;
    permissions: Array<Permission>;
}

export type UserGroup = {
    userId: string;
    groupId: string;
}

export interface UserServiceInterface {
    find(id: string): Promise<User | null>;
    create(newUser: User): Promise<User | null>;
    update(user: User): Promise<User | null>;
    delete(id: string): Promise<User | null>;
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
export interface GroupServiceInterface {
    find(id: string): Promise<Group | null>;
    create(newUser: Group): Promise<Group | null>;
    update(user: Group): Promise<Group | null>;
    delete(id: string): Promise<number>;
    getAll(): Promise<Group[]>;
    addUsers(userIds: string[], groupId: string): Promise<number>
}
export interface GroupControllerInterface {
    find: ControllerMethod;
    create: ControllerMethod;
    update: ControllerMethod;
    delete: ControllerMethod
    getAll: ControllerMethod;
    addUsers: ControllerMethod;
}
