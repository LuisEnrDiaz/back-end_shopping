export type id = string | number;

export interface UserRepo<T> {
    getUser: (id: id) => Promise<T>;
    createUser: (user: Partial<T>) => Promise<T>;
    findUser: (user: Partial<T>) => Promise<T>;
    updateUser: (id: id, user: Partial<T>) => Promise<T>;
    deleteUser: (id: id) => Promise<id>;
}
