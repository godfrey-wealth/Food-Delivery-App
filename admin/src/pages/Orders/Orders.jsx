

import React from 'react'

import './Orders.css'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { useEffect } from 'react';

import {assets} from '../../assets/assets'

const Orders = ({FOOD_LIST_URL}) => {

  const [orders, setOrders] = useState([])

  const FetchAllOrders = async () => {

    const response = await axios.get(`${FOOD_LIST_URL}/api/order/list`);

    if(response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error: Data fetch was unsuccessful");
      setError("Error: Data fetch was unsuccessful");
    }
  }

  const StatusHandler = async (event, orderId) => {

    try {

     const response = await axios.post(`${FOOD_LIST_URL}/api/order/status`, {status: event.target.value, orderId});

     if(response.data.success) {
      toast.success(response.data.message);
      FetchAllOrders();
     } else {
      toast.error("Error: Data fetch was unsuccessful");
      setError("Error: Data fetch was unsuccessful");
     }

    }

    catch (error) {

      console.log(error);

    }
  }

  useEffect(() => {
    FetchAllOrders();
  }, [])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
         
          <div  key={index} className="order-item">

            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if(index === order.items.length - 1) {
                    
                    return item.name + " x " + item.quantity
                    
                  }else{

                  return item.name + " x " + item.quantity + ", "

                  }
                  
              })}
              </p>
              <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className='order-item-address'>
                <p>{order.address.street + ", "}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zip}</p> 
               
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>

            <p>Items: {order.items.length}</p>

            <p>Total: €{order.amount}</p>

            <select onChange={(event) => StatusHandler(event, order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>

            </div>
        ))}
      </div>
    </div>
  )
}

export default Orders