import { createContext, useEffect, useState } from "react"

import axios from "axios";

export const StoreContext = createContext(null);


const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({})
    const FOOD_LIST_URL = "http://localhost:4000";
    
    const [token, setToken] = useState("");

    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {

       if(!cartItems[itemId]){

        setCartItems(prev => ({...prev, [itemId]: 1}))
       }

       else{

        setCartItems(prev => ({...prev, [itemId]: prev[itemId] + 1}))
       }

       if(token){

        await axios.post(FOOD_LIST_URL + "/api/cart/add", {itemId}, {headers:{token}});
         
       }

    }

    const removeFromCart = async (itemId) => {
        setCartItems(prev => ({...prev, [itemId]: prev[itemId] - 1}))

        if(token){
            await axios.post(FOOD_LIST_URL + "/api/cart/remove", {itemId}, {headers:{token}});
        }

    }

   const getTotalCartAmount = () => {
    let totalAmount = 0

    for(const item in cartItems){
       
        if(cartItems[item] > 0){

        let itemInfo = food_list.find((product) => product._id === item);

     totalAmount += itemInfo.price * cartItems[item];
     }
    }
    return totalAmount;
   }

   const FectchFoodList = async () => {

    const response = await axios.get(FOOD_LIST_URL + "/api/food/list");
    console.log('API Response:', response.data);
    if (response.data.success) {
        setFoodList(response.data.food); // Accessing 'food' instead of 'data'
    } else {
        console.log('API Error:', response.data.message);
    }
}


const LoadCartData = async (token) => {

    const response = await axios.post(FOOD_LIST_URL + "/api/cart/get",{}, {headers:{token}});
    console.log('API Response:', response.data.cartData);
    if (response.data.success) {
        setCartItems(response.data.cartData); // Accessing 'food' instead of 'data'
    } else {
        console.log('API Error:', response.data.message);
    }
}



   useEffect(() => {
    async function LoadData (){
        await FectchFoodList();

        if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));

            await LoadCartData(localStorage.getItem("token"));
        }
    }

    LoadData();
    // const token = localStorage.getItem("token");

    // if(token){

    //     setToken(token);

    // }

   }, []);

    const contextValue = {

        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        FOOD_LIST_URL,
        token,
        setToken
        
    }
    return <StoreContext.Provider value={contextValue}>
        {props.children}
        
    </StoreContext.Provider>
}

export default StoreContextProvider;