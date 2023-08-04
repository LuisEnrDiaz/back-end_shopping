import bc from 'bcryptjs';
import { passwordEncrypt } from './passwordEncrypts';

describe('Given passwordEncrypt', () => {
    const spyBcHash = jest.spyOn(bc, 'hash');

    describe('When we call passwordEncrypt', () => {
        test('Bcrypt.hash should be called', async () => {
            await passwordEncrypt('123');

            expect(spyBcHash).toHaveBeenCalled();
        });
    });
});
