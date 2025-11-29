import { useContext, useEffect } from "react";
import {
  deleteBookingById,
  getAllBooking,
} from "../../../services/axiosClientService";
import { AppContext } from "../../context/AppContext";
import BookingCard from "../../components/BookingCard";
import toast from "react-hot-toast";

const GetAllBooking = () => {
  const { totalBookings, setTotalBookings } = useContext(AppContext);
  const adminId = localStorage.getItem("adminId");
const adminIsActive = localStorage.getItem("adminIsActive");
  // --------------------------
  // Load All Bookings
  // --------------------------
  const loadData = async () => {
    try {
      const res = await getAllBooking();
      
      setTotalBookings(res.data.bookings);   // ✅ update state → rerender
    } catch (error) {
      console.log(error);
    }
  };

  // Run once when admin loads page
  useEffect(() => {
    loadData();
  }, []);

  // --------------------------
  // Delete Booking
  // --------------------------
 const deleteBooking = async (bookingId) => {
   try {
     await deleteBookingById(bookingId); // API call to delete
 
     // Re-fetch updated bookings list
     const res = await getAllBooking();
    toast.success("Deleted Successfully")
     // Update context → triggers re-render
     setTotalBookings(res.data.bookings);
 
   } catch (err) {
     console.log("Delete error:", err);
   }
   
  };
  return (
    <div className="h-min w-full bg-cover bg-center bg-no-repeat -mt-40 mb-10">
      <section className="relative opacity-90 h-full py-10 bg-gray-50 sm:py-16 lg:py-24">
        <h1 className="text-center text-primary text-3xl">
          {adminIsActive?<b><u> Manage Bookings</u></b> : <b><u>Your Bookings</u></b>}
        </h1>

        <div className="flex mt-6 mb-12 ml-3 justify-center items-center flex-wrap gap-4">
          {totalBookings.length === 0 ? (
            <p>No Bookings Found</p>
          ) : (
            totalBookings.map((item) => (
              <BookingCard
                key={item._id}
                id={item._id}
                banquet={item.banquet._id}
                customer={item.customer._id}
                description={item.description}
                dateStart={item.dateStart}
                dateEnd={item.dateEnd}
                location={item.banquet.location}
                charge={item.banquet.charge}
                BanquetName={item.banquet.BanquetName}
                customerName={item.customer.name}
                customerEmail={item.customer.email}
                totalCharge={item.totalCharge}
                onDelete={() => deleteBooking(item._id)}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default GetAllBooking;
