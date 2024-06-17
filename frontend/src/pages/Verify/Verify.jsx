
import React, { useContext, useEffect } from 'react'

import './Verify.css'
import {  } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get('success'); 
    const orderId = searchParams.get('orderId');

    const {FOOD_LIST_URL} = useContext(StoreContext);
    const navigate = useNavigate();

    
    console.log(success, orderId);

    const VerifyPayment = async () => {

        const response = await axios.post(FOOD_LIST_URL + "/api/order/verify", {
            success, orderId});

            if (response.data.success) {
                console.log('API Response:', response.data);
                navigate('/myorders');
            } else {
                navigate('/');
                console.log('API Error:', response.data.message);
            } 

    }

    useEffect(() => {
        VerifyPayment();
    }, []);
  return (
    <div className='verify'>
        <div className='spinner'></div>
    </div>
  )
}

export default Verify