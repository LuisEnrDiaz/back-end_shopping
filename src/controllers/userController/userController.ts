import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';

import { UserI } from '../../types/user/userI.js';
import { UserRepo } from '../../repository/userRepo.js';
import { ProductRepo } from '../../repository/productRepo.js';
import { ProductI } from '../../types/product/productI.js';
import { CartRepo } from '../../repository/cartRepo.js';
import { CartI } from '../../types/cart/cartI.js';
import { HTTPError } from '../../httpError/httpError.js';
import { passwordValidate } from '../../service/auth/passwordValidate/passwordValidate.js';
import { createToken } from '../../service/auth/createToken/createToken.js';
import { ExtraRequest } from '../../middleware/interceptorsMiddleware/interceptorsMiddleware.js';
import { createHttpError } from '../../httpError/createHttpError.js';

const debug = createDebug('SH: controller:userController');

export class UserController {
    constructor(
        public readonly userRepository: UserRepo<UserI>,
        public readonly productRepository: ProductRepo<ProductI>,
        public readonly cartRepository: CartRepo<CartI>
    ) {
        debug('instance');
    }

    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            debug('getUser');

            const user = await this.userRepository.getUser(req.params.id);

            res.status(200).json(user);
        } catch (error) {
            next(createHttpError);
        }
    }

    async register(req: Request, res: Response, next: NextFunction) {
        try {
            debug('register');

            const user = await this.userRepository.createUser(req.body);

            const cart = await this.cartRepository.createCart({
                user: user.id,
            });

            const updateUser = await this.userRepository.updateUser(
                user.id.toString(),
                { cart: cart.id }
            );

            res.status(201).json(updateUser);
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );

            next(httpError);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            debug('login', req.body.name);

            const user = await this.userRepository.findUser({
                email: req.body.email,
            });

            const isPasswordValid = await passwordValidate(
                req.body.password,
                user.password
            );

            if (!isPasswordValid) {
                throw new Error();
            }

            const token = createToken({
                email: user.email,
                id: user.id.toString(),
            });

            res.status(200).json({ token: token });
        } catch (error) {
            next(createHttpError(error as Error));
        }
    }

    async deleteUser(req: ExtraRequest, res: Response, next: NextFunction) {
        try {
            debug('deleteUser');

            if (!req.payload) {
                throw new Error('Not found id');
            }

            await this.userRepository.deleteUser(req.payload.id);

            res.status(204).json();
        } catch (error) {
            next(createHttpError(error as Error));
        }
    }

    async addProductFavorites(
        req: ExtraRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            debug('addProductFavorites');

            if (!req.payload) {
                throw new Error('Not found id');
            }

            const user = await this.userRepository.getUser(req.payload.id);

            user.favorites.forEach((item) => {
                if (item._id.toString() === req.body.id.toString()) {
                    throw new Error('Duplicated id');
                }
            });

            user.favorites.push(req.body.id);

            const favorites = await this.userRepository.updateUser(
                user.id.toString(),
                user
            );

            res.status(200).json(favorites);
        } catch (error) {
            next(createHttpError(error as Error));
        }
    }

    async removeProductFavorites(
        req: ExtraRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            debug('deleteProductFavorites');
            if (!req.payload) {
                throw new Error('Not found id');
            }

            const user = await this.userRepository.getUser(req.payload.id);

            const removeFavorites = user.favorites.filter((item) => {
                return item._id.toString() !== req.body.id;
            });

            const updateUser = await this.userRepository.updateUser(
                user.id.toString(),
                {
                    favorites: removeFavorites,
                }
            );

            res.status(200).json(updateUser);
        } catch (error) {
            next(createHttpError(error as Error));
        }
    }
}
