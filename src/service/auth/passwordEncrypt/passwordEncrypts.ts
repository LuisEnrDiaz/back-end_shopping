import bc from 'bcryptjs';

export const passwordEncrypt = (passwd: string) => {
    return bc.hash(passwd, 10);
};
