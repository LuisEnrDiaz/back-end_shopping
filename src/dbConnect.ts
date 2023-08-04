import mongoose from 'mongoose';

import { USER, PASSWORD } from './config.js';

export function dbConnect() {
    const DBName =
        process.env.NODE_ENV !== 'test' ? 'shopping' : 'shoppingTest';

    let uri = `mongodb+srv://${USER}:${PASSWORD}`;
    uri += `@cluster0.biz1mts.mongodb.net/${DBName}?retryWrites=true&w=majority`;

    mongoose.set('strictQuery', false);

    return mongoose.connect(uri);
}
