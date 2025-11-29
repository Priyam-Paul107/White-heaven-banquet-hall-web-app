import React, {  createContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
axios.defaults.withCredentials=true;
axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;
export const AppContext = createContext();
const AppContextProvider =({children})=>{
    const navigate =useNavigate();
    const [customer,setCustomer]=useState(false);
    const [customerData,setCustomerData]=useState(null);
    const [adminData,setAdminData]=useState(null);
    const [admin,setAdmin]=useState(null);
    const [banquet,setBanquet]=useState([]);
      const [banquetList, setBanquetList] = useState([]);
      const [bookings, setBookings] = useState([]);
      const [totalBookings, setTotalBookings] = useState([]);
      const [totalRevenue, setTotalRevenue] = useState(0);
    
    const [hallManager,setHallManager]=useState(null);
 const customerIsActive=localStorage.getItem('customerIsActive');
 const adminIsActive=localStorage.getItem('adminIsActive');
    const logout = async () => {
        setCustomer(false);
        setAdmin(false);
        if(customerIsActive){
          localStorage.removeItem("customerName")
          localStorage.removeItem("customerEmail")
          localStorage.removeItem("customerId")
          localStorage.removeItem("customerIsActive")
          localStorage.removeItem("customerJwtToken")
          localStorage.removeItem("customerProfileImage")
    
    
        }
        if(adminIsActive){
                  localStorage.removeItem("adminName")
            localStorage.removeItem("adminEmail")
            localStorage.removeItem("adminId")
            localStorage.removeItem("adminIsActive")
            localStorage.removeItem("adminJwtToken")
            localStorage.removeItem("adminProfileImage");
    
        }
    
        toast.success("Logged out successfully");
      };
      
    const fetchBanquetData=()=>{
        setBanquet(banquet);
    };
    useEffect(()=>{
        fetchBanquetData();
    },[]);
   
    const value={
        totalRevenue, setTotalRevenue,totalBookings, setTotalBookings,banquetList,bookings, setBookings, setBanquetList,logout,setAdminData,adminData,setCustomerData,customerData,navigate,customer,setHallManager,hallManager,setCustomer,axios,admin,setAdmin
    }
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
export default AppContextProvider;