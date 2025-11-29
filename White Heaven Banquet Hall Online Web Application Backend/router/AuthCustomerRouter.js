const express =require('express');
const AuthValidation =require('../validations/AuthValidation')
const AuthController =require('../controller/AuthCustomerController');
const upload =require('../middleware/profileUploads');
const { getAllBanquets, getBanquetById, nearestBanquet } = require('../controller/BanquetHallController');
const AuthmiddleWare = require('../middleware/AuthCustomerMiddleWare');
const { createBooking, getCustomerBookings, deleteBooking } = require('../controller/BookingController');
const router =express.Router();
router.post("/login",AuthValidation.loginValidation,AuthController.login);
router.post("/signup",upload.single("profileImage"),AuthValidation.signupValidation,AuthController.signup);
router.put("/update/:id",upload.single("profileImage"),AuthValidation.signupValidation,AuthController.updateUser);
router.get("/banquet",getAllBanquets);
router.get("/banquet/:id",getBanquetById);
router.post("/booking", AuthmiddleWare, createBooking);
router.get("/booking/:id", AuthmiddleWare, getCustomerBookings);
router.delete("/booking/:id", AuthmiddleWare, deleteBooking);
router.get("/customer/:id", AuthmiddleWare, AuthController.getCustomerById);
router.get("/banquet/nearest", nearestBanquet);

module.exports=router;