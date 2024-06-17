
import foodModel from "../models/FoodModel.js";

import fs from "fs";

import color from "colors";


// Add Food Or Create Food Items

const AddFood = async (req, res) => {
   
   
        let image_filename = `${req.file.filename}`;

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            image: image_filename
        });

        try {

            // food Already Exist

            const foodExist = await foodModel.findOne({ name: req.body.name });
            if (foodExist) {
                fs.unlinkSync(`uploads/${req.file.filename}`);
                console.log(color.bgRed("Food Already Exists", image_filename));
                return res.status(400).json(color.bgRed("Food Already Exists",));
            }
            await food.save();
            res.status(200).json({ success: true, message: "Food has been Added Successfully" });
            console.log(color.bgMagenta("Food Added Successfully"));
            //fs.unlinkSync(`uploads/${req.file.filename}`);
        } catch (error) {
            res.json(color.bgRed({success: false, message: "error"}));
        }

}

// Get All Food Items

const getAllFoods = async (req, res) => {
    try {

        const food = await foodModel.find();

        res.status(200).json({ success: true, message:"All Foods List fetched successfully", food });

        console.log(color.bgMagenta("Foods Retrieved Successfully", food));

    } catch (error) {

        res.json(color.bgRed({ success: false, message: "error" }));

        console.log(color.bgRed("Error", error));

    }

}


// Remove Food Item

const removeFood = async (req, res) => {

    try {
        const food = await foodModel.findByIdAndDelete(req.params.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food Not Found" });
        }

        fs.unlinkSync(`uploads/${food.image}`);

        res.status(200).json({ success: true, message: "Food Removed Successfully" });

        console.log(color.bgMagenta("Food Removed Successfully"));

    } catch (error) {

        res.json(color.bgRed({ success: false, message: "error" }));

        console.log(color.bgRed("Error", error));

    }
    
}


// Get Single Food Item

const getSingleFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.params.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food Not Found" });
        }
        res.status(200).json({ success: true, food });
        console.log(color.bgMagenta("Foods Retrieved Successfully", food));
    } catch (error) {
        res.json(color.bgRed({ success: false, message: "error" }));
        console.log(color.bgRed("Error", error));
    }
}


// Update Food Item

const updateFood = async (req, res) => {

    try {

        const food = await foodModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!food) {
            return res.status(404).json({ success: false, message: "Food Not Found" });
        }

        res.status(200).json({ success: true, food });

        console.log(color.bgMagenta("Food Updated Successfully"));

    } catch (error) {

        res.json(color.bgRed({ success: false, message: "error" }));

        console.log(color.bgRed("Error", error));

    }

}




// export

export { AddFood, getAllFoods, getSingleFood, updateFood, removeFood };