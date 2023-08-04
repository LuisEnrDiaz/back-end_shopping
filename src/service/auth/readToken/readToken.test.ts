import { mockDataUser } from '../../../mocks/mockUser';
import { createToken } from '../createToken/createToken';
import { readToken } from './readToken';

describe('Given readToken is called', () => {
    describe('When token is valid', () => {
        const validToken = createToken(mockDataUser);
        test('Then token is read', () => {
            const result = readToken(validToken);
            expect(result.name).toEqual(mockDataUser.name);
        });
    });

    describe('When there are no token', () => {
        const invalidToken = '';
        test('It should throw error', () => {
            expect(() => {
                readToken(invalidToken);
            }).toThrowError();
        });
    });

    describe('When token is not valid', () => {
        const invalidToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE2Njg3NzMwNTB9.DGdcCXGRUS4SaCMyY5RSy-8v9tylvmV_HE1rQJGYJ_55';

        test('It should throw error', () => {
            expect(() => {
                readToken(invalidToken);
            }).toThrowError;
        });
    });
});
