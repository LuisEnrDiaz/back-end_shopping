import jwt from 'jsonwebtoken';

import { TokenPayloadI } from '../../../types/token/tokenPayload.js';
import { getSecret } from '../getSecret/getSecret.js';

export const createToken = (payload: TokenPayloadI) => {
    return jwt.sign(payload, getSecret());
};
