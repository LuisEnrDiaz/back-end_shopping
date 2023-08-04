import { getSecret } from './getSecret';

describe('Given getSecret is called', () => {
    describe('When it is not string o it is empty', () => {
        test('Then return error', () => {
            expect(() => {
                getSecret('');
            }).toThrowError();
        });
    });
});
