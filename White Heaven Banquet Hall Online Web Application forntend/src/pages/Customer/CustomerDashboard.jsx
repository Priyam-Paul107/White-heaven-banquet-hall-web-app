import { useContext, useEffect, useState } from "react";
import { getAllBanquet, getCustomerById } from "../../../services/axiosClientService";
import BanquetCard from "../Banquet/BanquetCard";
import GetAllBookingByCustomerId from "./GetAllBookingByCustomerId";
import { AppContext } from "../../context/AppContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo";
const CustomerDashboard = () => {
  const [banquets, setBanquets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState({});
  const [error, setError] = useState("");
  const {navigate} =useContext(AppContext);
  const { logout ,bookings} = useContext(AppContext);
  const customerName = localStorage.getItem("customerName");
  const customerEmail = localStorage.getItem("customerEmail");
  const customerId = localStorage.getItem("customerId");
  const customerIsActive = localStorage.getItem("customerIsActive");
  const customerJwtToken = localStorage.getItem("customerJwtToken");
  const customerProfileImage = localStorage.getItem("customerProfileImage");
  // Fetch Data from Backend
  const fetchBanquets = async () => {
    try {
      const res = await getAllBanquet();        
      setBanquets(res.data.data); // adjust based on your response
    } catch (err) {
      setError("Failed to load banquet data");
    } finally {
      setLoading(false);
    }
  };
  const fetchCustomer= async(customerId)=>{
    try {
       const res = await getCustomerById(customerId);
      
      setCustomer(res.data.customer)
    } catch (err) {
      setError("Failed to load customer data");
    }}
  
  useEffect(() => {
    fetchBanquets();
    fetchCustomer(customerId)
  }, []);
  const active2 = customerIsActive ? (
    <section className="relative opacity-95 h-full py-10 bg-gray-50 sm:py-16 lg:py-24">
      <div className="w-full flex items-center justify-center py-6 px-4 -my-10 -mt-25">
        <Logo/>
      </div>

      <section className="w-full  bg-gradient-to-br from-primary to-secondary text-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
              Welcome to Your Dashboard{" "}
              <span className="text-white"> {customerName}</span>{" "}
            </h1>

            <p className="mt-4 text-lg md:text-xl opacity-90">
              Manage your bookings, explore banquet halls, and stay updated with
              your events — all in one place.
            </p>

            <div className="mt-8 flex gap-4">
              <button size="lg" className="rounded-2xl shadow-xl">
                <Link to={"/customer/my-booking"}> View My Bookings</Link>
              </button>
              <button
                size="lg"
                variant="outline"
                className="rounded-2xl border-white text-white hover:bg-white hover:text-blue-700 shadow-xl"
              >
                <Link to={"/banquets"}> Explore Banquets</Link>
              </button>
                <button
                onClick={()=>{navigate("/customer/update/"+customerId,{state:{email:customer.email,name:customer.name,address:customer.address,mobileNo:customer.mobileNo}})}}
                size="lg"
                variant="outline"
                className="rounded-2xl border-white text-white hover:bg-white hover:text-blue-700 shadow-xl"
              >
                Edit Profile
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center"
          >
            <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl w-72 md:w-96 text-center border border-white/20">
              <h3 className="text-2xl font-semibold mb-2">Quick Stats</h3>
              <p className="text-lg">Bookings: {bookings.length}</p>
              <p className="text-lg">Upcoming Events: 3</p>
              <p className="text-lg">Messages: 5</p>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="flex mt-40">
        <GetAllBookingByCustomerId/>
        </section>
      <h2 id="banquet" className="text-4xl font-bold  text-center text-primary m-6">
        {" "}
        <u>Ours Banquet Halls</u>
      </h2>
      <div className="w-full flex flex-wrap justify-center gap-6 p-6 items-center">
        {banquets.map((b) => (
          <BanquetCard
            key={b._id}
            id={b._id}
            banquetName={b.BanquetName}
            coverImage={b.coverImage.path}
            charge={b.charge}
          locationLat={b?.location?.coordinates?.[1] ?? 0}
              locationLng={b?.location?.coordinates?.[0] ?? 0}
            location={b.location}
            capacity={b.capacity}
          />
        ))}
      </div>
      <div className=" flex justify-center m-6">
        <button
          onClick={logout}
          className="px-10 py-2  bg-primary text-white rounded-lg shadow hover:bg-secondary cursor-pointer "
        >
          Logout
        </button>
      </div>
    </section>
  ) : (
    <div>Please login First</div>
  );

  return (
    <div
      className="h-min bg-cover bg-center bg-no-repeat -mt-40 mb-10"
      style={{ backgroundImage: "url('/banquets/cover.png')" }}
    >
      {" "}
      {active2}
    </div>
  );
};

export default CustomerDashboard;
