import { Router } from 'express';
import { CartController } from '../../controllers/cartController/cartController.js';
import { UserRepository } from '../../repository/userRepository/userRepository.js';
import { ProductRepository } from '../../repository/productRepository/productRepository.js';
import { CartRepository } from '../../repository/cartRepository/cartRepository.js';
import { logged } from '../../middleware/interceptorsMiddleware/interceptorsMiddleware.js';

export const cartRoutes = Router();

const cartController = new CartController(
    CartRepository.getInstance(),
    ProductRepository.getInstance(),
    UserRepository.getInstance()
);

cartRoutes.get('/:id', logged, cartController.getCart.bind(cartController));

cartRoutes.patch(
    '/addProductCart',
    logged,
    cartController.addProductCart.bind(cartController)
);

cartRoutes.patch(
    '/removeProductCart',
    logged,
    cartController.removeProductCart.bind(cartController)
);

cartRoutes.patch(
    '/removeAllProducts',
    logged,
    cartController.removeAllProductCart.bind(cartController)
);
