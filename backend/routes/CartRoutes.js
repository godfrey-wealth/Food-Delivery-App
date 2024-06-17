
import express from 'express';
import { GETCart, addToCart, removeCart } from '../controllers/CartController.js';
import AuthMiddleware from '../middleware/Auth.js';


const CartRouter = express.Router();


CartRouter.post('/add', AuthMiddleware, addToCart);

CartRouter.post('/remove', AuthMiddleware, removeCart);


CartRouter.post('/get', AuthMiddleware, GETCart);





export default CartRouter;