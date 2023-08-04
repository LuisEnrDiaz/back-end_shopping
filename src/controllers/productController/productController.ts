import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';

import { ProductRepo } from '../../repository/productRepo.js';
import { ProductI } from '../../types/product/productI.js';
import { UserRepo } from '../../repository/userRepo.js';
import { UserI } from '../../types/user/userI.js';
import { CartRepo } from '../../repository/cartRepo.js';
import { CartI } from '../../types/cart/cartI.js';
import { HTTPError } from '../../httpError/httpError.js';
import { ExtraRequest } from '../../middleware/interceptorsMiddleware/interceptorsMiddleware.js';
import { createHttpError } from '../../httpError/createHttpError.js';

const debug = createDebug('SH: controller:productController');

export class ProductController {
    constructor(
        public readonly productService: ProductRepo<ProductI>,
        public readonly userService: UserRepo<UserI>,
        public readonly cartService: CartRepo<CartI>
    ) {
        debug('instance');
    }

    async getProduct(req: Request, res: Response, next: NextFunction) {
        try {
            debug('getProduct');

            const product = await this.productService.getProduct(req.params.id);

            res.status(200).json(product);
        } catch (error) {
            next(createHttpError);
        }
    }

    async getAllProducts(req: Request, res: Response, next: NextFunction) {
        try {
            debug('getAllProducts');

            const products = await this.productService.getAllProducts();

            res.status(200).json(products);
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }

    async createProduct(req: ExtraRequest, res: Response, next: NextFunction) {
        try {
            debug('createProduct');

            if (!req.payload) {
                throw new Error('error');
            }

            const user = await this.userService.getUser(req.payload.id);

            if (user.admin === false) {
                throw new Error('Not credentials');
            }

            const newProduct = await this.productService.createProduct(
                req.body
            );

            res.status(201).json(newProduct);
        } catch (error) {
            next(createHttpError(error as Error));
        }
    }

    async updateProduct(req: ExtraRequest, res: Response, next: NextFunction) {
        try {
            debug('updateProduct');

            if (!req.payload) {
                throw new Error('error');
            }

            const user = await this.userService.getUser(req.payload.id);

            if (user.admin === false) {
                throw new Error('Not credentials');
            }

            const updateProduct = await this.productService.updateProduct(
                req.body.id,
                req.body
            );

            res.status(200).json(updateProduct);
        } catch (error) {
            next(createHttpError(error as Error));
        }
    }

    async deleteProduct(req: ExtraRequest, res: Response, next: NextFunction) {
        try {
            debug('deleteProduct');

            if (!req.payload) {
                throw new Error('error');
            }

            const user = await this.userService.getUser(req.payload.id);

            if (user.admin === false) {
                throw new Error('Not credentials');
            }

            const deleteProduct = await this.productService.deleteProduct(
                req.body
            );

            res.status(200).json(deleteProduct);
        } catch (error) {
            next(createHttpError(error as Error));
        }
    }
}
