import mongoose from 'mongoose';
import { UserRepository } from './userRepository';
import { dbConnect } from '../../dbConnect';
import { mockDataUserNotAdmin, mockUsers } from '../../mocks/mockUser';
import { ProductRepository } from '../productRepository/productRepository';

describe('Given UserRepository', () => {
    const repo = UserRepository.getInstance();
    ProductRepository.getInstance();

    let testId: Array<string>;

    beforeAll(async () => {
        await dbConnect();
        await repo.getUserModel().deleteMany();
        await repo.getUserModel().insertMany(mockUsers);

        const data = await repo.getUserModel().find();

        testId = [data[0].id, data[1].id];
    });

    describe('Given getUser', () => {
        test('Then getUser should return a user', async () => {
            const result = await repo.getUser(testId[0]);

            expect(result.name).toEqual(mockUsers[0].name);
        });

        test('Then getUser return error', () => {
            expect(async () => {
                await repo.getUser(testId[8]);
            }).rejects.toThrowError();
        });

        test('Then it should throw an error ', async () => {
            await expect(repo.getUser(testId[77])).rejects.toThrowError(
                'Not found id'
            );
        });
    });

    describe('Then findUser', () => {
        test('then should return a user', async () => {
            const result = await repo.findUser(mockUsers[0]);

            expect(result.name).toEqual(mockUsers[0].name);
        });

        test('Then should return error', () => {
            expect(async () => {
                await repo.findUser({ name: '' });
            }).rejects.toThrowError();
        });

        test('Then it should throw an error ', async () => {
            await expect(
                repo.findUser({ name: 'federico' })
            ).rejects.toThrowError('Not found id');
        });
    });

    describe('Then createUser', () => {
        test('Then createUser should return', async () => {
            await repo.createUser(mockDataUserNotAdmin);

            expect(mockDataUserNotAdmin.name).toEqual('ricardo');
        });

        test('Then createUser should return error', () => {
            expect(async () => {
                await repo.createUser({ name: '' });
            }).rejects.toThrowError();
        });

        test('Then it should throw an error ', async () => {
            await expect(repo.createUser({})).rejects.toThrowError(
                'Password is not valid'
            );
        });
    });

    describe('Then updateUser', () => {
        const updateName = 'ricardo';

        test('Then updateUser should return', async () => {
            const result = await repo.updateUser(testId[0], {
                name: updateName,
            });

            expect(result.name).toEqual(updateName);
        });

        test('Then updateUser should return error', () => {
            expect(async () => {
                await repo.updateUser(testId[8], {
                    name: updateName,
                });
            }).rejects.toThrowError();
        });

        test('Then it should throw an error ', async () => {
            await expect(repo.updateUser(testId[15], {})).rejects.toThrowError(
                'Not found id'
            );
        });
    });

    describe('Then deleteUser', () => {
        test('Then deleteUser should return', async () => {
            const result = await repo.deleteUser(testId[0]);

            expect(result).toEqual(testId[0]);
        });

        test('Then it should throw an error ', async () => {
            await expect(repo.deleteUser(testId[0])).rejects.toThrowError(
                'Not found id'
            );
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });
});
