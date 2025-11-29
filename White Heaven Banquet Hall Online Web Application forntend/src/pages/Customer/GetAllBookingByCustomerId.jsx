import { useContext, useEffect } from "react";
import {
  deleteBookingById,
  getBanquetById,
  getBookingByCustomerId,
} from "../../../services/axiosClientService";
import BookingCard from "../../components/BookingCard";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const GetAllBookingByCustomerId = ({ id }) => {
  const { bookings, setBookings } = useContext(AppContext);
  const customerId =localStorage.getItem("customerId")
  useEffect(() => {
    const loadData = async () => {
      // 1. Fetch raw bookings
      const res = await getBookingByCustomerId(customerId);
      const baseBookings = res.data.bookings;

      // 2. Fetch banquet details for each booking
      const fullBookings = await Promise.all(
        baseBookings.map(async (item) => {
          const banquetRes = await getBanquetById(item.banquet);
          const banquet = banquetRes.data.data;

          return {
            ...item,
            banquetName: banquet.BanquetName,
            location: banquet.location,
            charge: banquet.charge,

          };
        })
      );

      // 3. Store final merged bookings → triggers re-render
      setBookings(fullBookings);
    };

    loadData();
  }, [customerId, setBookings]);
const deleteBooking = async (bookingId) => {
  try {
    await deleteBookingById(bookingId); // API call to delete

    // Re-fetch updated bookings list
    const res = await getBookingByCustomerId(id);
    toast.success("deleted Successfully")
    // Update context → triggers re-render
    setBookings(res.data.bookings);

  } catch (err) {
    console.log("Delete error:", err);
  }
};
console.log(bookings);

  return (
    <div
      className="h-min w-full bg-cover bg-center bg-no-repeat -mt-40 mb-10"
      style={{ backgroundImage: "url('/banquets/cover.png')" }}
    >
      <section className="relative opacity-90 h-full py-10 bg-gray-50 sm:py-16 lg:py-24">
        <h1 className="text-center text-primary text-3xl">
          <b>
            <u>Your Bookings</u>
          </b>
        </h1>

        <div className="flex mt-6 mb-12 ml-3 justify-center items-center flex-wrap gap-4">
          {bookings.length === 0 ? (
            <p>No Bookings Found</p>
          ) : (
            bookings.map((item) => (
              <BookingCard
                key={item._id}
                id={item._id}
                banquet={item.banquet}
                BanquetName={item.banquetName}
                location={item.location}
                charge={item.charge}
                customer={item.customer}
                description={item.description}
                dateStart={item.dateStart}
                dateEnd={item.dateEnd}
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

export default GetAllBookingByCustomerId;
