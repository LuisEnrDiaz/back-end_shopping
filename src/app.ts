import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { setCors } from './middleware/corsMiddleware/corsMiddleware.js';
import { userRoutes } from './routes/userRoutes/userRoutes.js';
import { productRoutes } from './routes/productRoutes/productsRoutes.js';
import { cartRoutes } from './routes/cartRoutes/cartRoutes.js';

export const app = express();

app.disable('x-powered-by');

const corsOptions = {
    origin: '*',
};

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);

app.use(setCors);

app.get('/', (req, res) => {
    app.use(express.static('public'));
    res.sendFile('index.html', { root: './public' });
});
