import React, { useState, useEffect } from 'react';
import './Orders.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch orders.");
      console.error(error);
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(url + "/api/order/updateStatus", {
      orderId: orderId,
      status: event.target.value
    });

    if (response.data.success) {
      toast.success(response.data.message);
      await fetchAllOrders();
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="admin-order">
      <h2>Order Page</h2>
      <div className="order-list">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Items</th>
              <th>Customer Name</th>
              <th>Phone No.</th>
              <th>Address</th>
              <th>Total Items</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="order-item">
                <td>{order.orderId}</td>
                <td>
                  {order.items.map((item, idx) => (
                    <p key={index}>{item.name} x {item.quantity}</p>
                  ))}
                </td>
                <td>{order.address.firstName} {order.address.lastName}</td>
                <td>{order.address.phone}</td>
                <td>
                  <p>{order.address.street},</p>
                  <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                </td>
                <td>{order.items.length}</td>
                <td>${order.amount}</td>
                <td>
                  <span>{order.status}</span>
                </td>
                <td>
                  <select onChange={(event) => statusHandler(event, order.orderId)} value={order.status}>
                    <option value="Food Processing">Food Processing</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
