import { Schema, Types, model } from 'mongoose';

import { setToJson } from '../../utils/setToJson.js';

export type ProductI = {
    id: Types.ObjectId;
    image: string;
    name: string;
    details: string;
    price: number;
    stoke: number;
};

export type ProtoProductI = {
    image: string;
    name: string;
    details: string;
    price: number;
    stoke: number;
};

export const productSchema = new Schema<ProductI>({
    image: { type: String, required: true },
    name: { type: String, required: true },
    details: { type: String, required: true },
    price: { type: Number, required: true },
    stoke: { type: Number, required: true },
});

setToJson(productSchema);

export const Product = model<ProductI>('Product', productSchema, 'products');
