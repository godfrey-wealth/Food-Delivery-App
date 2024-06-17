import React, { useContext,  useEffect,  useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItems, FOOD_LIST_URL} = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const placeOrder = async (e) => {
    e.preventDefault();

    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];

        orderItems.push(itemInfo);
      }
    });
   
    let orderData = {
    
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    let response = await axios.post(FOOD_LIST_URL + "/api/order/place", orderData, {headers:{token}});
    if(response.data.success){
     const {session_url} = response.data;

     window.location.replace(session_url); // session_url = session_url;
    }
    else{
      alert("error");
    }

  }

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  
  useEffect(() => {

    if(!token){

      navigate('/cart');

    }
    else if (getTotalCartAmount() === 0) {

      navigate('/cart');

    }

  }, [token]);
 


  return (
    <form onSubmit={placeOrder} className='place-order' >
        <div className="place-order-left">
          <p className='title'>Delivery Information</p>
          <div className="multi-fields">
            <input required  name='firstName' value={data.firstName} onChange={onChangeHandler} type="text" placeholder='First Name'/>
            <input required name='lastName' value={data.lastName} onChange={onChangeHandler} type="text" placeholder='Last Name' />
          </div>
          <input required name='email' value={data.email} onChange={onChangeHandler} type="email" placeholder='Email Address' />
          <input required name='street' value={data.street} onChange={onChangeHandler} type="text" placeholder='Street' />
          <div className="multi-fields">
            <input required name='city' value={data.city} onChange={onChangeHandler} type="text" placeholder='City'/>
            <input required name='state' value={data.state} onChange={onChangeHandler} type="text" placeholder='State' />
          </div>
          <div className="multi-fields">
            <input required name='zip' value={data.zip} onChange={onChangeHandler} type="text" placeholder='Zip Code'/>
            <input required name='country' value={data.country} onChange={onChangeHandler} type="text" placeholder='Country' />
          </div>
          <input required name='phone' value={data.phone} onChange={onChangeHandler} type="text" placeholder='Phone Number' />
        </div>

        <div className="place-order-right">
        <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>€{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>€{getTotalCartAmount()===0?0:2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>€{getTotalCartAmount()=== 0 ? 0: getTotalCartAmount() + 2}</b>
              </div>
            </div>
            <button type='submit'  >PROCEED TO PAYMENT</button>
          </div>
          </div>
    </form>
  )
}

export default PlaceOrder;