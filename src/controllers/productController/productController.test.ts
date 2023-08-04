import { Request, Response, NextFunction } from 'express';

import { ProductRepository } from '../../repository/productRepository/productRepository';
import { ProductController } from './productController';
import { UserRepository } from '../../repository/userRepository/userRepository';
import { CartRepository } from '../../repository/cartRepository/cartRepository';
import { ExtraRequest } from '../../middleware/interceptorsMiddleware/interceptorsMiddleware';
import { CustomError } from '../../interface/errorInterface';
import { HTTPError } from '../../httpError/httpError';
import { mockDataProduct, mockProducts } from '../../mocks/mockProduct';
import { mockDataUser } from '../../mocks/mockUser';

describe('Given ProductController', () => {
    let productRepo: ProductRepository;
    let productController: ProductController;
    let userRepo: UserRepository;
    let cartRepo: CartRepository;

    let req: Partial<ExtraRequest>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        productRepo = ProductRepository.getInstance();
        userRepo = UserRepository.getInstance();
        cartRepo = CartRepository.getInstance();

        productController = new ProductController(
            productRepo,
            userRepo,
            cartRepo
        );

        req = {};
        res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn();
        next = jest.fn();
    });

    describe('Given getAllProducts', () => {
        test('Then should getAllProducts return [products]', async () => {
            productRepo.getAllProducts = jest.fn().mockReturnValue(['product']);

            await productController.getAllProducts(
                req as Request,
                res as Response,
                next
            );

            expect(res.json).toHaveBeenCalledWith(['product']);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test('Then should getAllProducts return error', async () => {
            const error: CustomError = new HTTPError(
                503,
                'service unavailable',
                'message of error'
            );

            productRepo.getAllProducts = jest.fn().mockRejectedValue(error);

            await productController.getAllProducts(
                req as Request,
                res as Response,
                next
            );

            expect(error).toBeInstanceOf(HTTPError);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('Given getProduct', () => {
        test('Then should getProduct return productId', async () => {
            req = {
                params: {
                    id: mockDataProduct.id,
                },
            };

            productRepo.getProduct = jest.fn().mockReturnValue(req.params!.id);

            await productController.getProduct(
                req as Request,
                res as Response,
                next
            );

            expect(res.json).toHaveBeenCalledWith(mockDataProduct.id);
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test('Then should getProduct return error', async () => {
            const error: CustomError = new HTTPError(
                503,
                'service unavailable',
                'message of error'
            );

            productRepo.getProduct = jest.fn().mockRejectedValue(error);

            await productController.getProduct(
                req as Request,
                res as Response,
                next
            );

            expect(error).toBeInstanceOf(HTTPError);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('Given createProduct', () => {
        test('Then should createProduct return product', async () => {
            req = {
                payload: { id: mockDataProduct.id },
                body: mockDataProduct,
            };

            userRepo.getUser = jest.fn().mockReturnValue(req.payload!.id);

            productRepo.createProduct = jest.fn().mockReturnValue(req.body);

            await productController.createProduct(
                req as Request,
                res as Response,
                next
            );

            expect(res.json).toHaveBeenCalledWith(mockDataProduct);
            expect(res.status).toHaveBeenCalledWith(201);
        });

        test('Then should createProduct return error', async () => {
            const error: CustomError = new HTTPError(
                503,
                'service unavailable',
                'error'
            );

            userRepo.getUser = jest.fn().mockResolvedValue({ admin: true });

            productRepo.createProduct = jest
                .fn()
                .mockRejectedValue(mockProducts);

            req = {};

            await productController.createProduct(
                req as Request,
                res as Response,
                next
            );

            expect(error).toBeInstanceOf(HTTPError);
            expect(next).toHaveBeenCalledWith(error);
        });

        test('Then should createProduct return error Not credentials', async () => {
            const error: CustomError = new HTTPError(
                503,
                'service unavailable',
                'Not credentials'
            );

            req = {
                payload: { id: mockDataProduct.id },
            };

            userRepo.getUser = jest.fn().mockResolvedValue({ admin: false });

            productRepo.createProduct = jest.fn().mockRejectedValue(error);

            req = {
                payload: { id: mockDataProduct.id },
            };

            await productController.createProduct(
                req as Request,
                res as Response,
                next
            );

            expect(error).toBeInstanceOf(HTTPError);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('Given updateProduct', () => {
        test('Then should updateProduct return product', async () => {
            req = {
                payload: { id: mockDataUser.id },
                body: mockDataProduct,
            };

            userRepo.getUser = jest
                .fn()
                .mockReturnValue({ id: req.payload!.id, admin: true });

            productRepo.updateProduct = jest
                .fn()
                .mockReturnValue(mockDataProduct);

            await productController.updateProduct(
                req as Request,
                res as Response,
                next
            );

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockDataProduct);
        });

        test('Then should updateProduct return error Not credentials', async () => {
            const error: CustomError = new HTTPError(
                503,
                'service unavailable',
                'Not credentials'
            );

            req = {
                payload: { id: mockDataUser.id },
                body: mockDataProduct,
            };

            userRepo.getUser = jest.fn().mockReturnValue({ admin: false });

            productRepo.updateProduct = jest.fn().mockReturnValue(error);

            await productController.updateProduct(
                req as Request,
                res as Response,
                next
            );

            expect(error).toBeInstanceOf(HTTPError);
            expect(next).toHaveBeenCalledWith(error);
        });

        test('Then updateProduct should return error not payload', async () => {
            const error: CustomError = new HTTPError(
                503,
                'service unavailable',
                'error'
            );

            userRepo.getUser = jest.fn().mockReturnValue({ admin: true });

            productRepo.updateProduct = jest
                .fn()
                .mockReturnValue(mockDataProduct);

            req = {};

            await productController.updateProduct(
                req as Request,
                res as Response,
                next
            );

            expect(error).toBeInstanceOf(HTTPError);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('Given deleteProduct', () => {
        test('Then should deleteProduct return', async () => {
            req = {
                payload: { id: mockDataUser.id },
                body: { id: mockDataProduct.id },
            };

            userRepo.getUser = jest.fn().mockReturnValue(req.payload!.id);
            productRepo.deleteProduct = jest.fn().mockReturnValue(req.body.id);

            await productController.deleteProduct(
                req as Request,
                res as Response,
                next
            );

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(req.body.id);
        });

        test('Then should deleteProduct return error Not credentials', async () => {
            const error: CustomError = new HTTPError(
                503,
                'service unavailable',
                'Not credentials'
            );

            req = {
                payload: { id: mockDataUser.id },
                body: mockDataProduct,
            };

            userRepo.getUser = jest.fn().mockReturnValue({ admin: false });

            productRepo.deleteProduct = jest.fn().mockReturnValue(error);

            await productController.deleteProduct(
                req as Request,
                res as Response,
                next
            );

            expect(error).toBeInstanceOf(HTTPError);
            expect(next).toHaveBeenCalledWith(error);
        });

        test('Then should deleteProduct return error not payload', async () => {
            const error: CustomError = new HTTPError(
                503,
                'service unavailable',
                'error'
            );

            userRepo.getUser = jest.fn().mockReturnValue({ admin: true });

            productRepo.deleteProduct = jest.fn().mockReturnValue(error);

            req = {};

            await productController.deleteProduct(
                req as Request,
                res as Response,
                next
            );

            expect(error).toBeInstanceOf(HTTPError);
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
