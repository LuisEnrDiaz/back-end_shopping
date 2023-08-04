import { CartI } from '../types/cart/cartI.js';

import { id } from './userRepo.js';

export interface CartRepo<T> {
    getCart: (id: id) => Promise<T>;
    createCart: (cart: Partial<CartI>) => Promise<T>;
    updateCart: (id: id, product: Partial<CartI>) => Promise<T>;
    removeProductCart: (id: id, product: Partial<CartI>) => Promise<T>;
}
