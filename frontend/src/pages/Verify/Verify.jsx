import React, { useEffect } from 'react'
import './Verify.css'
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const Verify = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const orderId = searchParams.get('orderId');
    const { url } = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
        try {
            const response = await axios.post(`${url}/api/order/verifyOrder`, { orderId });
            if (response.data.success) {
                navigate('/myorders');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            alert("Error verifying payment");
        }
    };


    useEffect(() => {
        verifyPayment();
    }, []);
  return (
    <div className='verify'>
        <div className="spinner">

        </div>
    </div>
  )
}

export default Verify