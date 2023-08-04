import bc from 'bcryptjs';

import { passwordEncrypt } from '../passwordEncrypt/passwordEncrypts';
import { passwordValidate } from './passwordValidate';

describe('Whe we call passwdValidate, the passwd ans its encryption are compared', () => {
    let hash: string;
    const passwd = '123456';
    const badPasswd = '000000';

    const spyBcCompare = jest.spyOn(bc, 'compare');

    beforeEach(async () => {
        hash = await passwordEncrypt(passwd);
    });

    test('Then a valid password should be detected', async () => {
        const result = await passwordValidate(passwd, hash);
        expect(spyBcCompare).toHaveBeenCalled();
        expect(result).toBe(true);
    });

    test('Then a not valid password should be detected', async () => {
        const result = await passwordValidate(badPasswd, hash);
        expect(spyBcCompare).toHaveBeenCalled();
        expect(result).toBe(false);
    });
});
