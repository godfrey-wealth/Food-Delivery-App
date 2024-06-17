

import React, {  useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopUp = ({setShowLogin}) => {

    const [currentState, setCurrentState] = useState("Login")
    const {FOOD_LIST_URL, setToken} = useContext(StoreContext);

    const onLogin = async (e) => {

        e.preventDefault();

        let FoodDEL_URL = FOOD_LIST_URL;

        if(currentState === "Login"){
            FoodDEL_URL += "/api/user/login";
        }
        else{
            FoodDEL_URL += "/api/user/register";
        }

        const response = await axios.post(FoodDEL_URL , data);

        if(response.data.success){
            
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setShowLogin(false);


        }
        else{
            alert(response.data.message);
        }

      
    }

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const onChangeHandler = (e) => {
      
        const name = e.target.name
        const value = e.target.value
        setData(data => ({...data , [name]:value}))
    }

  
  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>

            <div className="login-popup-inputs">
                {currentState === "Login" ? <></>: <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='your name' required />}
               
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='your email' required />
                <input name='password' onChange={onChangeHandler} value={data.password}  type="password" placeholder='your password' required />
               
            </div>

           <button type='submit'>{currentState === "Sign up" ? "Create account" : "Login"}</button>
           <div className="login-popup-condition">
           <input type="checkbox"  required />
           <p>By creating an account you agree to our <span>Terms & Conditions</span></p>
           </div>
           {currentState === "Login" ? 
           <p>Create a New Account? <span onClick={() => setCurrentState("Sign up")}>Click here</span></p> 
           :<p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
           }
           
         
        </form>
    </div>
  )
}

export default LoginPopUp