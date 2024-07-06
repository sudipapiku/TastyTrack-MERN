import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5173";

    try {
        // Save the new order in the database
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            orderId: '' // Placeholder for Razorpay order ID
        });
        await newOrder.save();
        
        // Clear the user's cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Create an order in Razorpay
        const options = {
            amount: req.body.amount*100, // amount in the smallest unit
            currency: "INR",
            receipt: `order_rcptid_${newOrder._id}`,
            payment_capture: 1 // auto capture payment
        };

        const order = await razorpay.orders.create(options);

        // Update the order with Razorpay order ID
        newOrder.orderId = order.id;
        await newOrder.save();

        // Respond with the order details
        res.json({
            success: true,
            orderId: order.id,
            amount: req.body.amount,
            currency: "INR",
            key: process.env.RAZORPAY_KEY_ID,
            frontend_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Internal Server Error" });
    }
};

export { placeOrder };
