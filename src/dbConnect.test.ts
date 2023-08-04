import mongoose from 'mongoose';

import { dbConnect } from './dbConnect.js';

const spiConnect = jest.spyOn(mongoose, 'connect');

describe('dbConnect', () => {
    describe('dbConnect_test', () => {
        test('should connect to db', async () => {
            const result = await dbConnect();

            expect(spiConnect).toHaveBeenCalled();
            expect(typeof result).toBe(typeof mongoose);
            expect(result.connection.db.databaseName).toBe('shoppingTest');
        });
    });

    describe('dbConnect_not_test', () => {
        test('should not connect to db', async () => {
            process.env.NODE_ENV = 'development';
            const result = await dbConnect();

            expect(spiConnect).toHaveBeenCalled();
            expect(typeof result).toBe(typeof mongoose);
            expect(result.connection.db.databaseName).toBe('shopping');
        });
    });

    afterEach(() => {
        mongoose.disconnect();
    });
});
