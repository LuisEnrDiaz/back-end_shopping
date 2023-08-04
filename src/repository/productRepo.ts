import { id } from './userRepo.js';

export interface ProductRepo<T> {
    getAllProducts: () => Promise<Array<T>>;
    getProduct: (id: id) => Promise<T>;
    createProduct: (product: Partial<T>) => Promise<T>;
    updateProduct: (id: id, product: Partial<T>) => Promise<T>;
    deleteProduct: (id: id) => Promise<id>;
}
