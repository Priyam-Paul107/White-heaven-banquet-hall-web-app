import { useContext, useEffect, useState } from "react";
import { getAllBanquet } from "../../../services/axiosClientService";
import BanquetCard from "../Banquet/BanquetCard";
import { AppContext } from "../../context/AppContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GetAllBooking from "./GetAllBooking";
import Logo from "../../components/Logo";

const AdminDashboard = () => {
  const [banquets, setBanquets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { logout, totalBookings, totalRevenue } = useContext(AppContext);

  const adminName = localStorage.getItem("adminName") || "Admin";
  const adminEmail = localStorage.getItem("adminEmail") || "";
  const adminId = localStorage.getItem("adminId") || "";
  const adminIsActive = localStorage.getItem("adminIsActive");
  const adminJwtToken = localStorage.getItem("adminJwtToken");
  const adminProfileImage = localStorage.getItem("adminProfileImage");

  // Fetch Data from Backend
  const fetchBanquets = async () => {
    try {
      const res = await getAllBanquet();
      setBanquets(res?.data?.data ?? []); // Safe fallback
    } catch (err) {
      setError("Failed to load banquet data");
    } finally {
      setLoading(false);
    }
  };
  if(localStorage.getItem("totalRevenue")===null)
    localStorage.setItem("totalRevenue",0)
  useEffect(() => {
    fetchBanquets();
  }, []);

  // If not logged in
  if (!adminIsActive) {
    return <div className="text-center mt-10 text-2xl">Please login first</div>;
  }

  return (
    <div
      className="h-min bg-cover bg-center bg-no-repeat -mt-40 mb-10"
      style={{ backgroundImage: "url('/banquets/cover.png')" }}
    >
      <section className="relative opacity-95 h-full py-10 bg-gray-50 sm:py-16 lg:py-24">
        
        {/* Title */}
        <div className="w-full flex items-center justify-center py-8 px-4 -my-5 -mt-20">
          <h1 className="text-3xl md:text-5xl text-primary font-extrabold tracking-tight">
            <Logo/>
          </h1>
        </div>

        {/* Hero Section */}
        <section className="w-full -mt-6 bg-gradient-to-br from-primary to-secondary text-white py-20 px-6">

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl font-bold leading-tight text-center drop-shadow-lg">
                Welcome to Your Admin Dashboard{" "}
                <span className="text-white"> {adminName.toUpperCase()}</span>
              </h2>

              <p className="mt-4 text-lg md:text-xl opacity-90">
                Manage your bookings, banquet halls, and stay updated — all in one place.
              </p>

              <div className="mt-8 flex gap-4">
                <button className="px-2 py-1 rounded-2xl shadow-xl bg-primary hover:bg-white hover:text-secondary text-white">
                  <Link to={"/admin/getallbooking"}>View All Bookings</Link>
                </button>

                <button className="px-2 py-1 border-white rounded-2xl text-white hover:bg-white hover:text-secondary shadow-xl">
                  <Link to={"/admin/registerBanquet"}>Explore/Register Banquets</Link>
                </button>
                <button className="px-2 py-1 border-white rounded-2xl text-white hover:bg-white hover:text-secondary shadow-xl">
                  <Link to={"/admin/check-customer"}>Check All Customer</Link>
                </button>
              </div>
            </motion.div>

            {/* Right - Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex justify-center"
            >
              <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl w-72 md:w-96 text-center border border-white/20">
                <h3 className="text-2xl font-semibold mb-2">Quick Stats</h3>

                <p className="text-lg">
                  Total Bookings: {totalBookings?.length ?? 0}
                </p>

                <p className="text-lg">Upcoming Events: 3</p>
                <p className="text-lg">Messages: 5</p>

                <p className="text-lg mt-2">
                  Total Revenue: ₹ {localStorage.getItem("totalRevenue") ?? 0} from Bookings
                </p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Bookings */}
        <section className="mt-40">
          <GetAllBooking />
        </section>

        {/* Banquet List */}
        <h2 id="banquet" className="text-4xl font-bold text-center text-primary m-6">
          <u>Manage Banquet Halls</u>
        </h2>

        <div className="w-full flex flex-wrap justify-center gap-6 p-6 items-center">
          {banquets?.length > 0 ? (
            banquets.map((b) => (
              <BanquetCard
                key={b?._id}
                id={b?._id}
                banquetName={b?.BanquetName ?? "Unnamed Hall"}
                coverImage={b?.coverImage?.path ?? ""}
                charge={b?.charge ?? 0}
                locationLat={b?.location?.coordinates?.[1] ?? 0}
                locationLng={b?.location?.coordinates?.[0] ?? 0}
                capacity={b?.capacity ?? 0}
              />
            ))
          ) : (
            <p className="text-center text-lg text-gray-500">No banquets found.</p>
          )}
        </div>

        {/* Logout */}
        <div className="flex justify-center m-6">
          <button
            onClick={logout}
            className="px-10 py-2 bg-primary text-white rounded-lg shadow hover:bg-secondary cursor-pointer"
          >
            Logout
          </button>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
