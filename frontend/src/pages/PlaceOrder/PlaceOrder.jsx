import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
    const { getTotalCartAmount, cartItems, food_list, url, token, userId } =
        useContext(StoreContext); // Assuming userId is available in StoreContext

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    const displayRazorpay = async (orderId, amount, key) => {
        const res = await loadRazorpayScript();

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const options = {
            key,
            amount: amount * 100,
            currency: "INR",
            name: "TastyTrack",
            description: "Order Payment",
            order_id: orderId,
            handler: async function (response) {
                try {
                    const verifyResponse = await axios.post(
                        `${url}/api/order/verify`,
                        {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: orderId,
                            razorpay_signature: response.razorpay_signature,
                        },
                        {
                            headers: { token },
                        }
                    );

                    if (verifyResponse.data.success) {
                        window.location.replace(verifyResponse.data.success_url);
                    } else {
                        alert("Payment verification failed. Please try again.");
                    }
                } catch (error) {
                    console.error("Error verifying payment:", error);
                    alert("Error verifying payment. Please try again.");
                }
            },
            prefill: {
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                contact: data.phone,
            },
            notes: {
                address: `${data.street}, ${data.city}, ${data.state}, ${data.country}, ${data.zipcode}`,
            },
            theme: {
                color: "#F37254",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];

        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item, quantity: cartItems[item._id] };
                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            userId,
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
        };

        try {
            let response = await axios.post(`${url}/api/order/place`, orderData, {
                headers: { token },
            });
            console.log(token);
            if (response.data.success) {
                const { orderId, amount, key } = response.data;
                displayRazorpay(orderId, amount, key); // Initiate Razorpay payment
            } else {
                alert("Error placing order");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Error placing order. Please try again.");
        }
    };
    const navigate = useNavigate();
    useEffect(() => {
        if (!token) {
            navigate("/cart");
        } else if (getTotalCartAmount()===0){
          navigate("/cart");
        }
    },[token]);

    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input
                        required
                        name="firstName"
                        onChange={onChangeHandler}
                        value={data.firstName}
                        type="text"
                        placeholder="First Name"
                    />
                    <input
                        required
                        name="lastName"
                        onChange={onChangeHandler}
                        value={data.lastName}
                        type="text"
                        placeholder="Last Name"
                    />
                </div>
                <input
                    required
                    name="email"
                    onChange={onChangeHandler}
                    value={data.email}
                    type="email"
                    placeholder="Email Address"
                />
                <input
                    required
                    name="street"
                    onChange={onChangeHandler}
                    value={data.street}
                    type="text"
                    placeholder="Street"
                />
                <div className="multi-fields">
                    <input
                        required
                        name="city"
                        onChange={onChangeHandler}
                        value={data.city}
                        type="text"
                        placeholder="City"
                    />
                    <input
                        required
                        name="state"
                        onChange={onChangeHandler}
                        value={data.state}
                        type="text"
                        placeholder="State"
                    />
                </div>
                <div className="multi-fields">
                    <input
                        required
                        name="zipcode"
                        onChange={onChangeHandler}
                        value={data.zipcode}
                        type="text"
                        placeholder="Zip Code"
                    />
                    <input
                        required
                        name="country"
                        onChange={onChangeHandler}
                        value={data.country}
                        type="text"
                        placeholder="Country"
                    />
                </div>
                <input
                    required
                    name="phone"
                    onChange={onChangeHandler}
                    value={data.phone}
                    type="text"
                    placeholder="Phone"
                />
            </div>
            <div className="div-place-order-right">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>$ {getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>$ {getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Total</p>
                            <p>
                                $ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
                            </p>
                        </div>
                        <hr />
                    </div>
                    <button type="submit">Proceed to Payment</button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
