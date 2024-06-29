import express from 'express';
const app = express();
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/auth.js"

//import userRoutes from "./Routes/user.js";

app.use(express.json());// bcoz req.body is null by default toh usse chnage krne k liye
app.use(cookieParser());

import 'dotenv/config'



mongoose.connect(`mongodb+srv://${process.env.dbUser}:${process.env.dbpassword}@cluster0.qwrhadv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
    console.log("db Connected");
});
//const fun = require('./api');

import cors from 'cors'
import routes from "./Routes/Basic.js";
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);

//app.use("/api/users", userRoutes);
app.use(routes);



app.listen(8000, () => {
    console.log("server started, Have A good Day");
})