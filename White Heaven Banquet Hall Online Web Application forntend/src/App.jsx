import React, { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Contact from "./pages/Contact";
import Banquets from "./pages/Banquet/Banquets";
import CustomerDashboard from "./pages/Customer/CustomerDashboard";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import FAQ from "./pages/FAQ";
import AdminLogin from "./pages/Admin/AdminLogin";
import RegisterBanquet from "./pages/Admin/RegisterBanquet";
import SingleBanquet  from "./pages/SingleBanquet";
import BookingCreate from "./pages/Customer/BookingCreate";
import GetAllBookingByCustomerId from "./pages/Customer/GetAllBookingByCustomerId";
import AdminDashboard from "./pages/Admin/AdminDashBoard";
import { AppContext } from "./context/AppContext";
import GetAllBooking from "./pages/Admin/GetAllBooking";
import UpdateBanquetForm from "./pages/Admin/UpdateBanquetForm";
import UpdateCustomer from "./pages/Customer/UpdateCustomer";
import CustomerDetails from "./pages/Admin/CustomerDetails";
import NearestBanquet from "./pages/Banquet/NearestBanquet";
const App = () => {
  const {setCustomer,setAdmin,customerData,adminData}=useContext(AppContext) 
  useEffect(()=>{
    const customer =localStorage.getItem("customerIsActive")
    const admin =localStorage.getItem("adminIsActive")
    setCustomer(customer);
    setAdmin(admin);
  },[]);
  
  return (
    <div>
      <Toaster />
      <Navbar customerData={customerData} adminData={adminData} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/admin" element={<AdminLogin />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/faq" element={<FAQ />}></Route>
        <Route path="/banquets" element={<Banquets />}></Route>
        <Route path="/customer/booking" element={<BookingCreate />}></Route>
        <Route path="/customer/my-booking" element={<GetAllBookingByCustomerId />}></Route>
        <Route path="/customer/:id" element={<CustomerDashboard />}></Route>
        <Route path="/admin/:id" element={<AdminDashboard />}></Route>
        <Route path="/banquet/:id" element={<SingleBanquet />}></Route>
        <Route path="/admin/edit-banquet/:id" element={<UpdateBanquetForm/>}/>
        <Route
          path="/admin/registerBanquet"
          element={<RegisterBanquet />}
        ></Route>
        <Route
          path="/admin/getallbooking"
          element={<GetAllBooking />}
        ></Route>
        <Route path="/customer/update/:id" element={<UpdateCustomer/>}></Route>
        <Route path="/admin/check-customer" element={<CustomerDetails/>}/>
        <Route path="/banquet/nearest" element={<NearestBanquet/>}/>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
