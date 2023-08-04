import { Schema, Types, model } from 'mongoose';

import { setToJson } from '../../utils/setToJson.js';

export type CartI = {
    id: Types.ObjectId;
    products: Array<Types.ObjectId>;
    user: Types.ObjectId;
};

export type ProtoCartI = {
    products: Array<Types.ObjectId>;
    user: Types.ObjectId;
};

export const cartSchema = new Schema<CartI>({
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

setToJson(cartSchema);

export const Cart = model<CartI>('Cart', cartSchema, 'carts');
