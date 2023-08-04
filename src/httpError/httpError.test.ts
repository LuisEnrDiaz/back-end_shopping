import { CustomError } from '../interface/errorInterface';
import { HTTPError } from './httpError';

describe('Given the class CustomError', () => {
    let error: CustomError;

    beforeEach(() => {
        error = new HTTPError(508, 'Loop Detected', 'We Loops');
    });

    test('When it is instantiated, then it should have the properties statusCode, message and data', () => {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(HTTPError);

        expect(error).toHaveProperty('statusCode', 508);
        expect(error).toHaveProperty('statusMessage', 'Loop Detected');
        expect(error).toHaveProperty('message', 'We Loops');
        expect(error).toHaveProperty('name', 'HTTPError');
    });
});
