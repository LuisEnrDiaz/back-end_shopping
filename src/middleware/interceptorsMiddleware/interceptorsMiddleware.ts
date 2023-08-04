import createDebug from 'debug';
import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import { HTTPError } from '../../httpError/httpError.js';
import { readToken } from '../../service/auth/readToken/readToken.js';

const debug = createDebug('SH: middleware:Interceptors');

export interface ExtraRequest extends Request {
    payload?: JwtPayload;
}

export const logged = (
    req: ExtraRequest,
    res: Response,
    next: NextFunction
) => {
    debug('logged');

    const authString = req.get('Authorization');

    if (!authString || !authString.startsWith('Bearer ')) {
        next(new HTTPError(403, 'Forbidden', 'User or password incorrect'));
        return;
    }

    try {
        const token = authString.slice(7);

        readToken(token);
        req.payload = readToken(token);
        next();
    } catch (error) {
        next(new HTTPError(403, 'Forbidden', 'User or password incorrect'));
        return;
    }
};

export const who = async (
    req: ExtraRequest,
    res: Response,
    next: NextFunction
) => {
    debug('who');

    try {
        if (!req.payload || req.payload.admin === false) {
            next(new HTTPError(403, 'Forbidden', 'Not credentials'));
        }
        next();
    } catch (error) {
        next(error);
    }
};
