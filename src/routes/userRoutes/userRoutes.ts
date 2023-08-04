import { Router } from 'express';
import { UserController } from '../../controllers/userController/userController.js';
import { UserRepository } from '../../repository/userRepository/userRepository.js';
import { ProductRepository } from '../../repository/productRepository/productRepository.js';
import { CartRepository } from '../../repository/cartRepository/cartRepository.js';
import { logged } from '../../middleware/interceptorsMiddleware/interceptorsMiddleware.js';

export const userRoutes = Router();

const userController = new UserController(
    UserRepository.getInstance(),
    ProductRepository.getInstance(),
    CartRepository.getInstance()
);

userRoutes.get('/:id', userController.getUser.bind(userController));

userRoutes.post('/register', userController.register.bind(userController));

userRoutes.post('/login', userController.login.bind(userController));

userRoutes.delete('/', userController.deleteUser.bind(userController));

userRoutes.patch(
    '/addFavorites',
    logged,
    userController.addProductFavorites.bind(userController)
);

userRoutes.patch(
    '/removeFavorites',
    logged,
    userController.removeProductFavorites.bind(userController)
);
