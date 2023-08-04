import jwt from 'jsonwebtoken';

import { mockDataUser } from '../../../mocks/mockUser';
import { createToken } from './createToken';
import { SECRET } from '../../../config';

describe('Given createToken is called', () => {
    test('When token is create', () => {
        const spyJwtSign = jest.spyOn(jwt, 'sign');
        const result = createToken(mockDataUser);
        expect(typeof result).toBe('string');
        expect(spyJwtSign).toHaveBeenCalledWith(mockDataUser, SECRET);
    });
});
