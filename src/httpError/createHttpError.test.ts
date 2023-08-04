import { CustomError } from '../interface/errorInterface';
import { createHttpError } from './createHttpError';
import { HTTPError } from './httpError';

describe('Given createHttpError', () => {
    test('Then should createHttpError return error', async () => {
        const error = new HTTPError(404, 'service unavailable', 'Not found id');

        createHttpError(error);

        expect(error).toBeInstanceOf(HTTPError);
        expect(error.statusCode).toBe(404);
        expect(error.message).toBe('Not found id');
    });

    test('Then should createHttpError return error', () => {
        const error: CustomError = new HTTPError(503, 'Not found id', 'error');

        expect(error).toBeInstanceOf(HTTPError);
        expect(error.statusCode).toBe(503);
        expect(error.message).toBe('error');
        expect(error.name).toBe('HTTPError');
    });
});
