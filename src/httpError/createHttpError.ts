import { HTTPError } from './httpError.js';

export function createHttpError(error: Error) {
    if (error.message === 'Not found id') {
        const httpError = new HTTPError(404, 'Not found', error.message);

        return httpError;
    }

    const httpError = new HTTPError(503, 'Service unavailable', error.message);

    return httpError;
}
