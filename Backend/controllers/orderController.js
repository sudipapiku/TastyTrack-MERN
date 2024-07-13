import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import dotenv from 'dotenv';
import crypto from 'crypto';

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
            orderId: '' ,
            paymentId:''
        });
        await newOrder.save();
        
        // Clear the user's cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Create an order in Razorpay
        const options = {
            amount: req.body.amount*100*80, 
            currency: "INR",
            receipt: `order_rcptid_${newOrder._id}`,
            payment_capture: 1 
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
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Internal Server Error" });
    }
};

const verifyPayment = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
      const { razorpay_payment_id, razorpay_order_id } = req.body;

      // Verify the payment signature
      const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
          .update(razorpay_order_id + "|" + razorpay_payment_id)
          .digest('hex');

      if (expectedSignature === req.body.razorpay_signature) {
          // Update order status in your database
          const order = await orderModel.findOneAndUpdate(
              { orderId: razorpay_order_id },
              { status: 'paid' , payment: true , paymentId: razorpay_payment_id },
              { new: true }
          );

          if (!order) {
              return res.status(404).json({ success: false, message: "Order not found" });
          }

          res.json({
              success: true,
              success_url: `${frontend_url}/verify?success=true&orderId=${order.orderId}`,
              payment_id: razorpay_payment_id,
              order_id: razorpay_order_id
          });
      } else {
          await orderModel.findOneAndDelete({ orderId: razorpay_order_id });
          res.json({
              success: false,
              success_url: `${frontend_url}/verify?success=false&orderId=${req.body.orderId}`,
              message: "Invalid signature"
          });
      }
  } catch (error) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


const orderVerify = async (req, res) => {
  try {
      const { orderId } = req.body; // Retrieve orderId from request body
      const order = await orderModel.findOne({ orderId });
      
      if (!order) {
          return res.status(404).json({ success: false, message: "Order not found" });
      }

      res.json({ success: true, order });
  } catch (error) {
      console.error("Error verifying order:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// user orders for frontend

const userOrders = async (req, res) => {
  try{
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data:orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal Server Error" });
  }

}

export { placeOrder, verifyPayment, orderVerify,userOrders };
