import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';

import { ProductRepo } from '../../repository/productRepo.js';
import { ProductI } from '../../types/product/productI.js';
import { UserRepo } from '../../repository/userRepo.js';
import { UserI } from '../../types/user/userI.js';
import { CartRepo } from '../../repository/cartRepo.js';
import { CartI } from '../../types/cart/cartI.js';
import { ExtraRequest } from '../../middleware/interceptorsMiddleware/interceptorsMiddleware.js';
import { createHttpError } from '../../httpError/createHttpError.js';

export const debug = createDebug('SH: controller:cartController');

export class CartController {
    constructor(
        public readonly cartRepository: CartRepo<CartI>,
        public readonly productRepository: ProductRepo<ProductI>,
        public readonly userRepository: UserRepo<UserI>
    ) {
        debug('instance');
    }

    async getCart(req: Request, res: Response, next: NextFunction) {
        try {
            debug('getCart');

            const user = await this.userRepository.getUser(req.params.id);
            const cart = await this.cartRepository.getCart(
                user.cart.toString()
            );

            res.status(200).json(cart);
        } catch (error) {
            next(error);
        }
    }

    async addProductCart(req: ExtraRequest, res: Response, next: NextFunction) {
        try {
            debug('addProductCart');

            if (!req.payload) {
                throw new Error('Not found id');
            }

            const user = await this.userRepository.getUser(req.payload.id);
            const cart = await this.cartRepository.getCart(
                user.cart.toString()
            );

            cart.products.forEach((item) => {
                if (item._id.toString() === req.body.id.toString()) {
                    throw new Error('Duplicated id');
                }
            });

            cart.products.push(req.body.id);

            const cartUpdate = await this.cartRepository.updateCart(
                cart.id.toString(),
                cart
            );

            res.status(200).json(cartUpdate);
        } catch (error) {
            next(createHttpError(error as Error));
        }
    }

    async removeProductCart(
        req: ExtraRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            debug('removeProductCart');

            if (!req.payload) {
                throw new Error('Not found id');
            }

            const user = await this.userRepository.getUser(req.payload.id);
            const cart = await this.cartRepository.getCart(
                user.cart.toString()
            );

            const removeProduct = cart.products.filter((item) => {
                return item._id.toString() !== req.body.id;
            });

            const updateCart = await this.cartRepository.updateCart(
                cart.id.toString(),
                { products: removeProduct }
            );

            res.status(200).json(updateCart);
        } catch (error) {
            next(createHttpError(error as Error));
        }
    }

    async removeAllProductCart(
        req: ExtraRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            debug('removeAllProductCart');

            if (!req.payload) {
                throw new Error('Not found id');
            }

            const user = await this.userRepository.getUser(req.payload.id);
            const cart = await this.cartRepository.getCart(
                user.cart.toString()
            );

            const updateCart = await this.cartRepository.updateCart(
                cart.id.toString(),
                {
                    products: [],
                }
            );

            res.status(200).json(updateCart);
        } catch (error) {
            next(createHttpError(error as Error));
        }
    }
}
