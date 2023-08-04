import { UserI } from '../types/user/userI';

export const mockDataUser = {
    name: 'ricardo',
    password: '123',
    email: 'emailRicardo',
    admin: true,
    id: '1',
    cart: '1',
    favorites: ['1', '2'],
};

export const mockDataUserNotAdmin: Partial<UserI> = {
    name: 'ricardo',
    password: '123',
    email: 'emailRicardo',
    admin: false,
};

export const mockUsers = [
    {
        name: 'pepe',
        password: '123',
        email: 'emailPepe',
    },
    {
        name: 'antonio',
        password: '123',
        email: 'emailAntonio',
    },
];
