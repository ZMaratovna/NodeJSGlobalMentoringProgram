export interface User {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export interface UserServiceInterface {
    find(id: string): Promise<User | ErrorMessage>;
    create(newUser: User): Promise<User | ErrorMessage>;
    update(id: string, updatedUser: User): Promise<User | ErrorMessage>;
    delete(id: string): Promise<void | ErrorMessage>;
    getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<User[] | ErrorMessage>;
    getAll(): Promise<User[]>;
  }

export type ErrorMessage = {
    error: boolean,
    message: string
}
