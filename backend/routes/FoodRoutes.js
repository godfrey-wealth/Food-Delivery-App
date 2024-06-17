
import express from 'express';

import multer from 'multer';
import { AddFood, getAllFoods, getSingleFood, removeFood, updateFood } from '../controllers/FoodController.js';



const foodRouter = express.Router();

// Image Storage Engine

const storage = multer.diskStorage({

    destination: "uploads",
    filename: (req, file, cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`);
    }

});

const upload = multer({

    storage: storage
});

foodRouter.post('/add', upload.single('image'), AddFood);
foodRouter.get('/list', getAllFoods);

// delete image from uploads folder

foodRouter.delete('/delete/:id', removeFood); 

foodRouter.get('/sigle/:id', getSingleFood);

foodRouter.put('/update/:id', updateFood);



export default foodRouter;

