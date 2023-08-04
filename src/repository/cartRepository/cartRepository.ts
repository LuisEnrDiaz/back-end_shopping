import createDebug from 'debug';

import { CartRepo } from '../cartRepo.js';
import { Cart, CartI } from '../../types/cart/cartI.js';
import { id } from '../userRepo.js';
import { ProductI } from '../../types/product/productI.js';

const debug = createDebug('SH: cartRepository');

export class CartRepository implements CartRepo<CartI> {
    #Model = Cart;

    static instance: CartRepository;

    public static getInstance(): CartRepository {
        if (!CartRepository.instance) {
            CartRepository.instance = new CartRepository();
        }
        return CartRepository.instance;
    }

    private constructor() {
        debug('CartRepository instance');
    }

    async getCart(id: id): Promise<CartI> {
        debug('getCart', id);

        const result = await this.#Model.findById(id);

        if (!result) {
            throw new Error('No cart found id');
        }
        return result;
    }

    async createCart(cart: Partial<CartI>): Promise<CartI> {
        debug('createCart', cart);

        const result = await this.#Model.create(cart);

        return result as CartI;
    }

    async updateCart(id: id, cart: Partial<CartI>): Promise<CartI> {
        debug('updateCart', id, cart);

        const result = await this.#Model.findByIdAndUpdate(id, cart, {
            new: true,
        });

        if (!result) {
            throw new Error('No cart found id');
        }

        return result;
    }

    async removeProductCart(
        id: id,
        product: Partial<ProductI>
    ): Promise<CartI> {
        debug('removeProductCart', id, product);

        const result = await this.#Model
            .findByIdAndRemove(id, product)
            .populate('products');

        if (!result) {
            throw new Error('No cart found id');
        }
        return result;
    }

    getCartModel() {
        return this.#Model;
    }
}
