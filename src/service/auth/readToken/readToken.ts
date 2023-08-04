import jwt from 'jsonwebtoken';

import { getSecret } from '../getSecret/getSecret.js';

export const readToken = (token: string) => {
    const payload = jwt.verify(token, getSecret());
    return payload as jwt.JwtPayload;
};
