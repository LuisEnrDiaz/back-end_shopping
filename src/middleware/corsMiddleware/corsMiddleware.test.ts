import { Request, Response, NextFunction } from 'express';
import { setCors } from './corsMiddleware';

describe('setCors', () => {
    const res: Partial<Response> = {
        setHeader: jest.fn(),
    };
    const next: NextFunction = jest.fn();

    describe('When setCors is origin', () => {
        const req: Partial<Request> = {
            header: jest.fn().mockReturnValue('origin'),
        };

        test('Then it set origin header', () => {
            setCors(req as Request, res as Response, next);
            expect(res.setHeader).toHaveBeenCalledWith(
                'Access-Control-Allow-Origin',
                'origin'
            );
        });
    });

    describe('When setCors is *', () => {
        const req: Partial<Request> = {
            header: jest.fn().mockReturnValue('*'),
        };

        test('Then it set origin header', () => {
            setCors(req as Request, res as Response, next);
            expect(res.setHeader).toHaveBeenCalledWith(
                'Access-Control-Allow-Origin',
                '*'
            );
        });
    });

    describe('When setCors is *', () => {
        const req: Partial<Request> = {
            header: jest.fn().mockReturnValue(undefined),
        };

        test('Then it set origin header', () => {
            setCors(req as Request, res as Response, next);
            expect(res.setHeader).toHaveBeenCalledWith(
                'Access-Control-Allow-Origin',
                '*'
            );
        });
    });
});
