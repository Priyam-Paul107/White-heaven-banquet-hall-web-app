const express =require('express');
const { model } = require('mongoose');
require('dotenv').config();
const bodyParser =require('body-parser');
const cors=require('cors');
require('./model/CustomerDB');
const AuthRouter =require('./router/AuthCustomerRouter');
const AuthAdminRouter =require('./router/AuthAdminRouter');
const paymentRoutes = require("./router/AuthPayment");

const multer = require('multer');
const PORT=process.env.PORT||4000;
const app =express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
  origin: "http://localhost:5173", // your frontend Vite URL
  credentials: true
}));
app.use("/uploads", express.static("uploads"));
app.use("/api/v1",AuthRouter);
app.use("/api/v1/admin",AuthAdminRouter);
app.use("/api/v1/payment", paymentRoutes);
app.listen(PORT,()=>console.log(`App is runnnig on at ${PORT}`))
