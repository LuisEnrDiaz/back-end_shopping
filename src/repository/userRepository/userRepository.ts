import createDebug from 'debug';

import { UserRepo, id } from '../userRepo.js';
import { User, UserI } from '../../types/user/userI.js';
import { passwordEncrypt } from '../../service/auth/passwordEncrypt/passwordEncrypts.js';

const debug = createDebug('SH: repository:UserRepository');

export class UserRepository implements UserRepo<UserI> {
    #Model = User;

    static instance: UserRepository;

    public static getInstance(): UserRepository {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
    }

    private constructor() {
        debug('UserRepository instance');
    }

    async getUser(id: id): Promise<UserI> {
        debug('getUser', id);

        const result = await this.#Model.findById(id).populate('favorites');

        if (!result) {
            throw new Error('Not found id');
        }

        return result;
    }

    async findUser(user: Partial<UserI>): Promise<UserI> {
        debug('findUser', user);

        const result = await this.#Model.findOne(user);

        if (!result) {
            throw new Error('Not found id');
        }
        return result as UserI;
    }

    async createUser(user: Partial<UserI>): Promise<UserI> {
        debug('createUser', user);

        if (typeof user.password !== 'string') {
            throw new Error('Password is not valid');
        }

        user.password = await passwordEncrypt(user.password);

        const result = await this.#Model.create(user);

        return result as UserI;
    }

    async updateUser(id: id, user: Partial<UserI>): Promise<UserI> {
        debug('updateUser', id, user);

        const result = await this.#Model.findByIdAndUpdate(id, user, {
            new: true,
        });

        if (!result) {
            throw new Error('Not found id');
        }
        return result;
    }

    async deleteUser(id: id): Promise<id> {
        debug('deleteUser', id);

        const result = await this.#Model.findByIdAndDelete(id);

        if (!result) {
            throw new Error('Not found id');
        }

        return id;
    }

    getUserModel() {
        return this.#Model;
    }
}
