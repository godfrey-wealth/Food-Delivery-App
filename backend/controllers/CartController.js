
import userModel from "../models/UserModel.js";

import color from "colors";




// Add Items to User cart 

const addToCart = async (req, res) => { 


    try {

        let userData = await userModel.findById(req.body.userId);

        let cartData = userData.cartData;

        // check if it is not  cart data

        if(!cartData[req.body.itemId]){

            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] +=1;
        }

        await userModel.findByIdAndUpdate( req.body.userId , {cartData });

        res.status(200).json({ success: true, message: "Item Added to cart Successfully" });

        console.log(color.bgBlue("Item Added to cart"));

    }
        catch (error) {

            console.log(color.bgRed("Error", error));

            res.json(color.bgRed({ success: false, message: "error"}));

        }

    
}



// Remove Items from User cart

const removeCart = async (req, res) => {


    try {

        let userData = await userModel.findById(req.body.userId);

        let cartData = await userData.cartData;

        if(cartData[req.body.itemId] > 0){

             cartData[req.body.itemId] -= 1;
        }

        await userModel.findByIdAndUpdate( req.body.userId , {cartData });

        res.status(200).json({ success: true, message: "Item Removed from cart Successfully" });

        console.log(color.bgYellow("Item Removed from cart"));
    }

        catch (error) {

            console.log(color.bgRed("Error", error));

            res.json(color.bgRed({ success: false, message: "error"}));

        }



}


// Fetch User Cart Data

const GETCart = async (req, res) => {


    try {

        let userData = await userModel.findById(req.body.userId);

        let cartData = await userData.cartData;

        res.status(200).json({ success: true, cartData });

        console.log(color.bgMagenta("CartData is  Retrieved Successfully"));

    }


    catch (error) {

        console.log(color.bgRed("Error", error));

        res.json(color.bgRed({ success: false, message: "error"}));


 }


}

export { addToCart, removeCart, GETCart };

