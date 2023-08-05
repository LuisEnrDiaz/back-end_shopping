import { Schema, Types, model } from 'mongoose';

import { setToJson } from '../../utils/setToJson.js';

export type ProductI = {
    id: Types.ObjectId;
    image: string;
    name: string;
    details: string;
    price: number;
    stoke: number;
    categories: Categories;
    color: string;
    offer: boolean;
};

Categories: 'shoes' | 'shirts' | 't-shirts' | 'jeans'

export type ProtoProductI = {
    image: string;
    name: string;
    details: string;
    price: number;
    stoke: number;
    categories: Categories;
    color: string;
    offer: boolean
};

export const productSchema = new Schema<ProductI>({
    image: { type: String, required: true },
    name: { type: String, required: true },
    details: { type: String, required: true },
    price: { type: Number, required: true },
    stoke: { type: Number, required: true },
    categories: { type: String, required:      true},
    color: { type: String, required: true},
    offer: { type: Boolean, required: true},
});

setToJson(productSchema);

export const Product = model<ProductI>('Product', productSchema, 'products');
