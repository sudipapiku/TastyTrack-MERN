import express from 'express';
import { verifyPayment } from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const paymentRouter = express.Router();
paymentRouter.post('/verify', authMiddleware, verifyPayment);

export default paymentRouter;
