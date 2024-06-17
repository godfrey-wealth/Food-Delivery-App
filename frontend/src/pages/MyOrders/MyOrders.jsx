
import React, { useContext, useEffect, useState } from 'react'

import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {

    const {FOOD_LIST_URL, token} = useContext(StoreContext);

    const [data, setData] = useState([]);

    const FetchOrders = async () => {
        const response = await axios.post(FOOD_LIST_URL + "/api/order/userorders", {}, {headers:{token}});
        if (response.data.success) {
            setData(response.data.data);
            console.log('API Response:', response.data.data);
        } else {
            console.log('API Error:', response.data.message);
        }
    }

    useEffect(() => {
        if(token)
            {
                FetchOrders();
            }
    }, [token]);

  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order, index) => {
              return (
              <div key={index} className="my-orders-order">
                <img src={assets.parcel_icon} alt="" />
                    <p>{order.items.map((item, index) =>{

                        if(index === order.items.length - 1){
                            return item.name+"x"+item.quantity
                        }
                        else{
                            return item.name+"x"+item.quantity+", "
                        }
                
                    })}
                </p>
                <p>€{order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p><span>&#x25cf; </span><b>{order.status}</b></p>
                <button onClick={()=>FetchOrders()}>Track Order</button>
              </div>
              )
        })}
        </div>
    </div>
  )
}

export default MyOrders