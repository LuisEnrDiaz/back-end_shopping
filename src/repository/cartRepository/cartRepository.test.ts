import mongoose from 'mongoose';

import { CartRepository } from './cartRepository';
import { dbConnect } from '../../dbConnect';
import { mockDataCart2 } from '../../mocks/mockCart';
import { ProductRepository } from '../productRepository/productRepository';
describe('Given CartRepository', () => {
    const repo = CartRepository.getInstance();
    ProductRepository.getInstance();
    let testId: Array<string>;

    beforeAll(async () => {
        await dbConnect();
        await repo.getCartModel().deleteMany();
        await repo.getCartModel().insertMany(mockDataCart2);

        const data = await repo.getCartModel().find();
        testId = [data[0].id];
    });

    describe('Given getCart', () => {
        test('Then it should return a cart', async () => {
            const result = await repo.getCart(testId[0]);
            expect(result.user).toEqual(mockDataCart2.user);
        });

        test('Then is should return error', () => {
            expect(async () => {
                await repo.getCart(testId[12]);
            }).rejects.toThrowError();
        });

        test('Then it should throw an error ', async () => {
            await expect(repo.getCart(testId[88])).rejects.toThrowError(
                'No cart found id'
            );
        });
    });

    describe('Given createCart', () => {
        test('Then is should return cart', async () => {
            const result = await repo.createCart(mockDataCart2);
            expect(result.user).toEqual(mockDataCart2.user);
        });
    });

    describe('Given updateCart', () => {
        test('Then is should return cart', async () => {
            const result = await repo.updateCart(testId[0], {});
            expect(result.user).toEqual(mockDataCart2.user);
        });

        test('Then is should return error', () => {
            expect(async () => {
                await repo.updateCart(testId[12], { products: [] });
            }).rejects.toThrowError();
        });

        test('Then it should throw an error ', async () => {
            await expect(repo.updateCart(testId[88], {})).rejects.toThrowError(
                'No cart found id'
            );
        });
    });

    describe('Given removeProductCart', () => {
        test('Then is should return cart', async () => {
            const result = await repo.removeProductCart(testId[0], {});
            expect(result.user).toEqual(mockDataCart2.user);
        });

        test('Then should return error', () => {
            expect(async () => {
                await repo.removeProductCart(testId[12], {});
            }).rejects.toThrowError();
        });

        test('Then it should throw an error ', async () => {
            await expect(
                repo.removeProductCart(testId[88], {})
            ).rejects.toThrowError('No cart found id');
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });
});
