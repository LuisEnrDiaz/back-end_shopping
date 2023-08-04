import { Request, Response, NextFunction } from 'express';

import { ProductRepository } from '../../repository/productRepository/productRepository';
import { UserRepository } from '../../repository/userRepository/userRepository';
import { CartRepository } from '../../repository/cartRepository/cartRepository';
import { UserController } from './userController';
import { ExtraRequest } from '../../middleware/interceptorsMiddleware/interceptorsMiddleware';
import { mockDataUser } from '../../mocks/mockUser';
import { CustomError } from '../../interface/errorInterface';
import { HTTPError } from '../../httpError/httpError';
import { mockDataCart } from '../../mocks/mockCart';
import { passwordValidate } from '../../service/auth/passwordValidate/passwordValidate';
import { createToken } from '../../service/auth/createToken/createToken';

jest.mock('../../service/auth/createToken/createToken.ts');
jest.mock('../../service/auth/getSecret/getSecret.ts');
jest.mock('../../service/auth/passwordEncrypt/passwordEncrypts.ts');
jest.mock('../../service/auth/passwordValidate/passwordValidate.ts');
jest.mock('../../service/auth/readToken/readToken.ts');

describe('Given UserController', () => {
    let userController: UserController;
    let userRepo: UserRepository;
    let productRepo: ProductRepository;
    let cartRepo: CartRepository;

    let req: Partial<ExtraRequest>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        productRepo = ProductRepository.getInstance();
        userRepo = UserRepository.getInstance();
        cartRepo = CartRepository.getInstance();

        userController = new UserController(userRepo, productRepo, cartRepo);

        req = {};
        res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn();
        next = jest.fn();
    });

    describe('Given register is called', () => {
        test('Then register should return', async () => {
            req = {
                body: mockDataUser,
            };

            userRepo.createUser = jest.fn().mockResolvedValue(req.body);

            cartRepo.createCart = jest
                .fn()
                .mockResolvedValue({ user: mockDataCart.id });

            userRepo.updateUser = jest.fn().mockResolvedValue(mockDataUser);

            await userController.register(
                req as Request,
                res as Response,
                next
            );

            expect(res.json).toHaveBeenCalledWith(mockDataUser);
            expect(res.json).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
        });

        test('Then register should return error', async () => {
            const error: CustomError = new HTTPError(
                503,
                'service unavailable',
                'message of error'
            );

            userRepo.createUser = jest.fn().mockRejectedValue(error);
            cartRepo.createCart = jest.fn().mockResolvedValue(error);
            userRepo.updateUser = jest.fn().mockResolvedValue(error);

            await userController.register(
                req as Request,
                res as Response,
                next
            );

            expect(error).toBeInstanceOf(HTTPError);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('Given getUser is called', () => {
        test('Then getUser should return', async () => {
            req = {
                params: {
                    id: mockDataUser.id,
                },
            };

            userRepo.getUser = jest.fn().mockReturnValue(req.params!.id);

            await userController.getUser(req as Request, res as Response, next);

            expect(res.json).toHaveBeenCalledWith(mockDataUser.id);
            expect(res.json).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
        });

        test('Then getUser should return error', async () => {
            const error: CustomError = new HTTPError(
                503,
                'service unavailable',
                'message of error'
            );

            userRepo.getUser = jest.fn().mockResolvedValue(error);

            await userController.getUser(req as Request, res as Response, next);

            expect(error).toBeInstanceOf(HTTPError);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('Given login is called', () => {
        test('Then login should return', async () => {
            req = {
                body: { email: mockDataUser.email },
            };
            userRepo.findUser = jest.fn().mockResolvedValue(mockDataUser);

            (passwordValidate as jest.Mock).mockResolvedValue(true);
            (createToken as jest.Mock).mockReturnValue('token');

            req.body = { password: '123' };

            await userController.login(req as Request, res as Response, next);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ token: 'token' });
            expect(res.json).toHaveBeenCalled();
        });

        test('Then login should return', async () => {
            const error: CustomError = new HTTPError(
                503,
                'service unavailable',
                'message of error'
            );

            userRepo.findUser = jest.fn().mockResolvedValue(mockDataUser);

            (passwordValidate as jest.Mock).mockResolvedValue(false);
            (createToken as jest.Mock).mockReturnValue('token');

            req.body = { password: '' };

            await userController.login(req as Request, res as Response, next);

            expect(error).toBeInstanceOf(HTTPError);
        });

        test('Then login should return error', async () => {
            const error: CustomError = new HTTPError(
                503,
                'service unavailable',
                'message of error'
            );

            userRepo.findUser = jest.fn().mockResolvedValue(error);

            (passwordValidate as jest.Mock).mockResolvedValue(false);

            await userController.login(req as Request, res as Response, next);

            expect(error).toBeInstanceOf(HTTPError);
            expect(next).toHaveBeenCalled();
        });
    });

    describe('Given deleteUser is called', () => {
        test('Then deleteUser should return', async () => {
            req = {
                payload: {
                    id: mockDataUser.id,
                },
            };

            userRepo.deleteUser = jest.fn().mockResolvedValue(req.payload!.id);

            await userController.deleteUser(
                req as Request,
                res as Response,
                next
            );

            expect(res.json).toHaveBeenCalledWith();
            expect(res.status).toHaveBeenCalledWith(204);
        });

        test('Then deleteUser should return error', async () => {
            const error: CustomError = new HTTPError(
                503,
                'service unavailable',
                'message of error'
            );

            userRepo.deleteUser = jest.fn().mockResolvedValue(undefined);

            await userController.deleteUser(
                req as Request,
                res as Response,
                next
            );

            expect(next).toHaveBeenCalled();
            expect(error).toBeInstanceOf(HTTPError);
        });
    });
});
