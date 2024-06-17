
import express from 'express'

import cors from 'cors'
import { connectionDB } from './config/DataBase.js';
import foodRouter from './routes/FoodRoutes.js';
import UserRouter from './routes/UserRoutes.js';
import 'dotenv/config'
import CartRouter from './routes/CartRoutes.js';
import OrderRouter from './routes/OrderRoutes.js';




// App Config
const app = express();

const PORT = process.env.PORT || 4000;


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//  DB connection

connectionDB();

// API end points

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", UserRouter);
app.use("/api/cart", CartRouter);
app.use("/api/order", OrderRouter);

// App Get Method




// Listening Server
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT} `))



