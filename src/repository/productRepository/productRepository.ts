import createDebug from 'debug';

import { ProductRepo } from '../productRepo.js';
import { id } from '../userRepo.js';
import { Product, ProductI } from '../../types/product/productI.js';

const debug = createDebug('SH: productRepository');

export class ProductRepository implements ProductRepo<ProductI> {
    #Model = Product;

    static instance: ProductRepository;

    public static getInstance(): ProductRepository {
        if (!ProductRepository.instance) {
            ProductRepository.instance = new ProductRepository();
        }
        return ProductRepository.instance;
    }

    private constructor() {
        debug('ProductRepository instance');
    }

    async getAllProducts(): Promise<ProductI[]> {
        debug('getAllProducts');

        const result = await this.#Model.find();

        return result;
    }

    async getProduct(id: id): Promise<ProductI> {
        debug('getProduct', id);

        const result = await this.#Model.findById(id);

        if (!result) {
            throw new Error('No product found id');
        }
        return result;
    }

    async createProduct(product: Partial<ProductI>): Promise<ProductI> {
        debug('createProduct', product);

        const result = await this.#Model.create(product);

        return result;
    }

    async updateProduct(id: id, product: Partial<ProductI>): Promise<ProductI> {
        debug('updateProduct', id, product);

        const result = await this.#Model.findByIdAndUpdate(id, product, {
            new: true,
        });

        if (!result) {
            throw new Error('No product found id');
        }

        return result;
    }

    async deleteProduct(id: id): Promise<id> {
        debug('deleteProduct', id);

        const result = await this.#Model.findByIdAndDelete(id);

        if (!result) {
            throw new Error('No product found id');
        }

        return id;
    }

    getProductModel() {
        return this.#Model;
    }
}
