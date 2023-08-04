import createDebug from 'debug';
import { Response } from 'express';

import { CustomError } from '../../interface/errorInterface.js';

const debug = createDebug('SH: middleware:errorManager');

export const errorManager = (error: CustomError, res: Response) => {
    debug(error.name, error.statusCode, error.statusMessage, error.message);

    let status = error.statusCode || 500;

    error.name === 'ValidationError' ? (status = 400) : status;

    const result = {
        status: status,
        type: error.name,
        error: error.message,
    };

    res.status(status);
    res.json(result);
    res.end();
};
