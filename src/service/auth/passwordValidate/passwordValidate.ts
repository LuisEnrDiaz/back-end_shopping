import bc from 'bcryptjs';

export const passwordValidate = (newPassword: string, hash: string) => {
    return bc.compare(newPassword, hash);
};
