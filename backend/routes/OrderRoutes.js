
import express from 'express';

import { ListOrders, PLaceOrder, UpdateStatus, UserOrders, VerifyOrder } from '../controllers/OrderController.js';
import AuthMiddleware from '../middleware/Auth.js';


const OrderRouter = express.Router();


OrderRouter.post('/place', AuthMiddleware, PLaceOrder);

OrderRouter.post('/verify', VerifyOrder);

OrderRouter.post('/userorders', AuthMiddleware, UserOrders);

OrderRouter.get('/list', ListOrders);

OrderRouter.post('/status', UpdateStatus);

export default OrderRouter;