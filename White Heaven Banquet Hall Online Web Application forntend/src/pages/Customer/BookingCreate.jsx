import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  createBooking,
  makePayment,
  verifyPayment,
} from "../../../services/axiosClientService";

import { AppContext } from "../../context/AppContext";

export default function BookingCreate() {
  const { customerData } = useContext(AppContext);

  const navigate = useNavigate();
  const { state } = useLocation();

  const [bookingId, setBookingId] = useState(null);
  const [totalCharge, setTotalCharge] = useState(0);
  const customerId = localStorage.getItem("customerId");
  const customerName = localStorage.getItem("customerName");
  const customerEmail = localStorage.getItem("customerEmail");
  const customerIsActive = localStorage.getItem("customerIsActive");

  if (!state) return <h2>No Banquet Selected</h2>;

  const { banquetId, banquetName, charge, location } = state;

  const [formData, setFormData] = useState({
    description: "",
    dateStart: "",
    dateEnd: "",
  });

  const [loading, setLoading] = useState(false);

  // 👉 Calculate total days × charge
  useEffect(() => {
    const { dateStart, dateEnd } = formData;

    if (!dateStart || !dateEnd) {
      setTotalCharge(0);
      return;
    }

    const start = new Date(dateStart);
    const end = new Date(dateEnd);

    if (isNaN(start) || isNaN(end)) {
      setTotalCharge(0);
      return;
    }

    const diffMs = end - start;
    const msPerDay = 1000 * 60 * 60 * 24;

    let days = Math.ceil(diffMs / msPerDay);
    if (days <= 0) days = 1;

    setTotalCharge(days * Number(charge));
  }, [formData.dateStart, formData.dateEnd, charge]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 👉 MAIN: Create booking → Payment → Verify
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!customerIsActive) {
      toast.error("You must login first");
      navigate("/login");
      return;
    }

    if (!formData.dateStart || !formData.dateEnd || !formData.description) {
      toast.error("Fill all fields");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create booking first
      const response = await createBooking({
        customer: customerId,
        banquet: banquetId,
        description: formData.description,
        dateStart: formData.dateStart,
        dateEnd: formData.dateEnd,
        totalCharge: totalCharge,
      });

      const newBooking = response.data;

      const newBookingId = newBooking.booking._id;
      setBookingId(newBookingId);

      // 2️⃣ Create Razorpay Order
      const res = await makePayment(totalCharge, newBookingId);
      const order = res.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "Banquet Booking",
        description: `Booking for ${banquetName}`,
        order_id: order.id,

        handler: async function (razorpayResponse) {
          try {
            // 3️⃣ Verify payment
            const verifyRes = await verifyPayment({
              ...razorpayResponse,
              bookingId: newBookingId,
              amount: totalCharge,
              bookingDetails: {
                customerId,
                banquetId,
                banquetName,
                charge,
              },
            });

            if (verifyRes.data.success) {
              toast.success("Payment Successful! Booking Confirmed!");
              navigate("/customer/bookings");
            } else {
              toast.error("Payment verification failed!");
            }
          } catch (err) {
            console.error("Verification error:", err);
            toast.error("Error verifying payment");
          }
        },

        prefill: {
          name: customerName,
          email: customerEmail,
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("Booking error:", error);

      // If banquet is already booked
      if (error.response?.data?.alreadyBooked) {
        const { bookedFrom, bookedTo } = error.response.data;

        toast.error(
          `Banquet is already booked from ${new Date(
            bookedFrom
          ).toLocaleDateString()} to ${new Date(
            bookedTo
          ).toLocaleDateString()}. Please try after this date.`
        );

        return; // STOP further execution
      }

      toast.error("Failed to create booking or start payment");
      console.error(error);
      toast.error("Failed to create booking or start payment");
    } finally {
      setLoading(false);
      localStorage.setItem(
        "totalRevenue",
        totalCharge + Number(localStorage.getItem("totalRevenue"))
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-3xl font-bold mb-5">Book {banquetName}</h1>

      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label className="font-semibold">Banquet Name</label>
          <input
            type="text"
            value={banquetName}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="font-semibold">Location</label>
          <input
            type="text"
            value={location}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="font-semibold">Charge / Day</label>
          <input
            type="text"
            value={`₹ ${charge}`}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="font-semibold">Purpose</label>
          <input
            type="text"
            name="description"
            onChange={handleChange}
            placeholder="Marriage / Event / Engagement"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Start Date</label>
          <input
            type="date"
            name="dateStart"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="font-semibold">End Date</label>
          <input
            type="date"
            name="dateEnd"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Total Charge</label>
          <input
            type="text"
            value={`₹ ${totalCharge}`}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Confirm & Pay"}
        </button>
      </form>
    </div>
  );
}
