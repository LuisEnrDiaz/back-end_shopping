import mongoose from 'mongoose';

import { ProductRepository } from './productRepository.js';
import { dbConnect } from '../../dbConnect.js';
import { mockProducts } from '../../mocks/mockProduct.js';

describe('Given ProductRepository', () => {
    const repo = ProductRepository.getInstance();

    let testId: Array<string>;

    beforeAll(async () => {
        await dbConnect();
        await repo.getProductModel().deleteMany();
        await repo.getProductModel().insertMany(mockProducts);

        const data = await repo.getProductModel().find();

        testId = [data[0].id, data[1].id];
    });

    describe('Given getAllProducts', () => {
        test('Then it should return all products', async () => {
            const result = await repo.getAllProducts();
            expect(result).toHaveLength(2);
        });
    });

    describe('Given getProduct', () => {
        test('Then it should return product', async () => {
            const result = await repo.getProduct(testId[0]);
            expect(result.name).toEqual(mockProducts[0].name);
        });

        test('Then it should return error', () => {
            expect(async () => {
                await repo.getProduct(testId[8]);
            }).rejects.toThrowError();
        });

        test('Then it should throw an error ', async () => {
            await expect(repo.getProduct(testId[88])).rejects.toThrowError(
                'No product found id'
            );
        });
    });

    describe('Given createProduct', () => {
        test('Then it should create product', async () => {
            const result = await repo.createProduct(mockProducts[0]);

            expect(result.name).toEqual('antonio');
        });

        test('Then it should return error', () => {
            expect(async () => {
                await repo.createProduct(mockProducts[12]);
            }).rejects.toThrowError();
        });
    });

    describe('Given updateProduct', () => {
        const updateProduct = { name: 'maya' };
        test('Then it should update product', async () => {
            const result = await repo.updateProduct(testId[0], updateProduct);

            expect(result.name).toEqual(updateProduct.name);
        });

        test('Then it should return error', () => {
            expect(async () => {
                await repo.updateProduct(testId[12], updateProduct);
            }).rejects.toThrowError();
        });

        test('Then it should throw an error ', async () => {
            await expect(
                repo.updateProduct(testId[55], {})
            ).rejects.toThrowError('No product found id');
        });
    });

    describe('Given deleteProduct', () => {
        test('Then it should delete product', async () => {
            const result = await repo.deleteProduct(testId[0]);

            expect(result).toEqual(testId[0]);
        });

        test('Then it should return error', () => {
            expect(async () => {
                await repo.deleteProduct(testId[12]);
            }).rejects.toThrowError();
        });

        test('Then it should throw an error ', async () => {
            await expect(repo.deleteProduct(testId[55])).rejects.toThrowError(
                'No product found id'
            );
        });
    });

    afterAll(async () => {
        await mongoose.disconnect();
    });
});
