const express =require('express');
const AuthValidation =require('../validations/AuthValidation')
const AuthAdminController =require('../controller/AuthAdminController');
const upload = require('../middleware/profileUploads');
const BanquetValidation =require("../validations/BanquetValidation");
const BanquetHallController  = require('../controller/BanquetHallController');
const HallImagesUploads = require('../middleware/HallImagesUploads');
const AuthmiddleWare = require('../middleware/AuthAdminMiddleWare');
const AdminOnly = require('../middleware/adminOnly');
const { getAllBookingsAdmin, deleteBooking } = require('../controller/BookingController');
const router =express.Router();
router.post("/login",AuthValidation.loginValidation,AuthAdminController.Adminlogin);
router.post("/signup",AuthValidation.signupValidation,upload.single("profileImage"), AuthAdminController.signupAdminOnlyBackend);
router.post("/banquet",AuthmiddleWare,AdminOnly,BanquetValidation, HallImagesUploads.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "additionalImages", maxCount: 10 }
]),BanquetHallController.BanquetHallController);
router.put("/banquet/:id",AuthmiddleWare,AdminOnly,BanquetValidation, HallImagesUploads.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "additionalImages", maxCount: 10 }
]),BanquetHallController.updateBanquet);
router.delete("/banquet/:id",AuthmiddleWare,AdminOnly,BanquetHallController.deleteBanquet);
router.get("/getallbooking", AuthmiddleWare, AdminOnly, getAllBookingsAdmin);
router.delete("/customer/:id",AuthmiddleWare,AdminOnly,AuthAdminController.deleteCustomerById);
router.get("/customer",AuthmiddleWare,AdminOnly,AuthAdminController.getAllCustomers);



module.exports=router;