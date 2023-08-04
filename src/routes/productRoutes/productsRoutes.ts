import { Router } from 'express';
import { ProductController } from '../../controllers/productController/productController.js';
import { ProductRepository } from '../../repository/productRepository/productRepository.js';
import { UserRepository } from '../../repository/userRepository/userRepository.js';
import { CartRepository } from '../../repository/cartRepository/cartRepository.js';
import {
    logged,
    who,
} from '../../middleware/interceptorsMiddleware/interceptorsMiddleware.js';

export const productRoutes = Router();

const productController = new ProductController(
    ProductRepository.getInstance(),
    UserRepository.getInstance(),
    CartRepository.getInstance()
);

productRoutes.get('/:id', productController.getProduct.bind(productController));

productRoutes.get(
    '/',
    productController.getAllProducts.bind(productController)
);

productRoutes.post(
    '/',
    logged,
    who,
    productController.createProduct.bind(productController)
);

productRoutes.patch(
    '/',
    logged,
    who,
    productController.updateProduct.bind(productController)
);

productRoutes.delete(
    '/',
    logged,
    who,
    productController.deleteProduct.bind(productController)
);
