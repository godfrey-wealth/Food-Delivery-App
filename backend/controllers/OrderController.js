
import orderModel from "../models/OrderModel.js";

import userModel from "../models/UserModel.js";

import color from "colors";

import Stripe from "stripe";


// initializing Stripe

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing User Order from Frontend

const PLaceOrder = async (req, res) => {

    const Frontend_URL = "http://localhost:5174";

    try {

       const newOrder = new orderModel({

           userId: req.body.userId,
           items: req.body.items,
           amount: req.body.amount,
           address: req.body.address

       });

       await newOrder.save();
       await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}});
       const line_items = req.body.items.map((item) => ({
           price_data: {
               currency: "eur",
               product_data: {
                   name: item.name
               },
               unit_amount: item.price *100*80    
           },
           quantity: item.quantity
       }))
       line_items.push({
           price_data: {
               currency: "eur",
               product_data: {
                   name: "Delivery Charges"
               },
               unit_amount: 2*100*80
           },
           quantity: 1
       })

       const session = await stripe.checkout.sessions.create({
           line_items: line_items,
           payment_method_types: ["card"],
           mode: "payment",
           success_url: `${Frontend_URL}/verify?success=true&orderId=${newOrder._id}`,
           cancel_url: `${Frontend_URL}/verify?success=false&orderId=${newOrder._id}`
       });

      res.json({success: true, session_url: session.url});

      console.log(color.bgGreen("Order Placed Successfully", newOrder));

      // })
    }

    catch (error) {

        console.log(color.bgRed("Error", error));

        res.json(color.bgRed({ success: false, message: "error" }));

    }


}

const VerifyOrder = async (req, res) => {
   const{success, orderId} = req.body;

   try {

    if(success === "true"){
       
        await orderModel.findByIdAndUpdate(orderId, {payment: true, paidAt: Date.now()});

        res.json({success: true, message: "Customer Orders Paid Successfully"});

        console.log(color.bgGreen("Customer Orders Paid Successfully"));
    }

    else{
        await orderModel.findByIdAndDelete(orderId);
        res.json({success: false, message: "Payment Failed"});

        console.log(color.bgRed("Payment Failed"));
    }

   }

   catch (error) {

    console.log(color.bgRed("Error", error));

    res.json(color.bgRed({ success: false, message: "error" }));

   }


}

// User Orders Verification from Frontend

const UserOrders = async (req, res) => {
   
    try {	

        const orders = await orderModel.find({userId: req.body.userId});

        res.json({success: true, data:orders});

        console.log(color.bgBlue("User Orders Retrieved Successfully", orders));

    }

    catch (error) {

        console.log(color.bgRed("Error", error));

        res.json(color.bgRed({ success: false, message: "error" }));

    }
}


//  get all List of Orders from Frontend Admin Panel

const ListOrders = async (req, res) => {
   
    try {

        const orders = await orderModel.find();

        res.json({success: true, data:orders});

        console.log(color.bgBlue("Orders Retrieved Successfully", orders));

    }

    catch (error) {

        console.log(color.bgRed("Error", error));

        res.json(color.bgRed({ success: false, message: "error" }));

    }

}


// API for Updating Order Status from Admin Panel

const UpdateStatus = async (req, res) => {

    try {
        
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status }, { new: true });
        res.status(200).json({ success: true, message: "Order Status Updated Successfully" });

        console.log(color.bgGreen("Order Status Updated Successfully"));

    } catch (error) {

        res.json(color.bgRed({ success: false, message: "error" }));

        console.log(color.bgRed("Error", error));

    }

}








export { PLaceOrder, VerifyOrder, UserOrders, ListOrders, UpdateStatus };

