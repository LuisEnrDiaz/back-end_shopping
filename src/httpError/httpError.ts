import { CustomError } from '../interface/errorInterface.js';

export class HTTPError extends Error implements CustomError {
    constructor(
        public statusCode: number,
        public statusMessage: string,
        public message: string,
        public options?: ErrorOptions
    ) {
        super(message, options);

        this.name = 'HTTPError';
    }
}
