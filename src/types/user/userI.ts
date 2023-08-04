import { Schema, Types, model } from 'mongoose';

import { setToJson } from '../../utils/setToJson.js';

export type UserI = {
    id: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    favorites: Array<Types.ObjectId>;
    cart: Types.ObjectId;
    admin: boolean;
};

export const userSchema = new Schema<UserI>({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    favorites: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],

    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart',
    },

    admin: {
        type: Boolean,
        default: false,
    },
});

setToJson(userSchema);

export const User = model<UserI>('User', userSchema, 'users');
