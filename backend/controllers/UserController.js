

import userModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

import color from "colors";


// Login User

const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {

        // checking if exist user Email

        const user = await userModel.findOne({ email });

        if (!user) {
            
            console.log(color.bgRed("User Not Found"));

            return res.status(400).json({ success: false, message: "User Not Found" }); 

        }

        // comparing password if password match

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            console.log(color.bgRed("Invalid Credentials"));

            return res.status(400).json({ success: false, message: "Ivalid Credentials" });
        }

        // create token

        const token = createToken(user._id);

        res.status(200).json({ success: true, token });
        console.log(color.bgMagenta("User Logged In Successfully"));
    } catch (error) {

        res.json(color.bgRed({ success: false, message: "error" }));	

        console.log(color.bgRed("Error", error));
    }

}


//const JWT_SECRET = "random#secret" || process.env.JWT_SECRET;

// Create TOken 

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: "3d" });
}


// Register User

const registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        // checking if exist user 

        const userExist = await userModel.findOne({ email });

        if (userExist) {

            return res.status(400).json({ success: false, message: "User Already Exist" });

        }

        // validating email amd Strong Password

        if(!validator.isEmail(email)){

            return res.status(400).json({ success: false, message: "Please Enter a Valid Email" });

        }

      //  Password validation

        if(password.length < 8){

        return res.status(400).json({ success: false, message: "Password must be at least 8 characters, Enter a Strong Password" });

        }
        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

    // creating new user

    const newUser = new userModel({
        name,
        email,
        password: hashedPassword
    })

  const user =  await newUser.save();

    const token = createToken(user._id);

    res.status(200).json({ success: true, message: "User Registered Successfully", token, user });

    console.log(color.bgMagenta("User Registered Successfully", user));

}catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
}

}


export { loginUser, registerUser };