import express from 'express';
import { placeOrder,verifyPayment,orderVerify, userOrders } from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';


const orderRouter = express.Router();
orderRouter.post('/place',authMiddleware, placeOrder);
orderRouter.post('/verify', authMiddleware, verifyPayment);
orderRouter.post('/verifyOrder', orderVerify);
orderRouter.post('/userorders', authMiddleware, userOrders);


export default orderRouter;