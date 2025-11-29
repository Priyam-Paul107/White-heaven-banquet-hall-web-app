const Booking = require("../model/BookingDB");
const Customer = require("../model/CustomerDB");
const Banquet = require("../model/BanquetDB");

// --------------------------------------
// CREATE NEW BOOKING (with date overlap check)
// --------------------------------------
const createBooking = async (req, res) => {
  try {
    const { customer, banquet, description, dateStart, dateEnd, totalCharge } = req.body;

    // 1️⃣ Validate required fields
    if (!customer || !banquet || !description || !dateStart || !dateEnd || !totalCharge) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 2️⃣ Check if customer exists
    const customerExists = await Customer.findById(customer);
    if (!customerExists) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // 3️⃣ Check if banquet exists
    const banquetExists = await Banquet.findById(banquet);
    if (!banquetExists) {
      return res.status(404).json({
        success: false,
        message: "Banquet not found",
      });
    }

    // -----------------------------------------------------------
    // 4️⃣ Prevent Double Booking : Date Overlap Condition
    // -----------------------------------------------------------
    const isBooked = await Booking.findOne({
      banquet,
      status: { $ne: "Cancelled" },
      $or: [
        {
          dateStart: { $lte: dateEnd },
          dateEnd: { $gte: dateStart }
        }
      ]
    });

    if (isBooked) {
      return res.status(400).json({
        success: false,
        alreadyBooked: true,
        message: "Banquet already booked",
        bookedFrom: isBooked.dateStart,
        bookedTo: isBooked.dateEnd
      });
    }

    // -----------------------------------------------------------
    // 5️⃣ Create booking
    // -----------------------------------------------------------
    const booking = await Booking.create({
      customer,
      banquet,
      description,
      dateStart,
      dateEnd,
      totalCharge,
      status: "Pending"
    });

    // 6️⃣ Populate fields for frontend
    const populatedBooking = await booking.populate([
      { path: "customer", select: "name email mobileNo" },
      { path: "banquet", select: "name location charge" },
    ]);

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking: populatedBooking,
    });

  } catch (error) {
    console.error("Create Booking Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// --------------------------------------
// GET ALL BOOKINGS (Admin Only)
// --------------------------------------
const getAllBookingsAdmin = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("customer", "name email mobileNo")
      .populate("banquet", "name charge location type BanquetName")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });

  } catch (error) {
    console.error("Get All Bookings Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// --------------------------------------
// GET BOOKINGS OF LOGGED-IN CUSTOMER
// --------------------------------------
const getCustomerBookings = async (req, res) => {
  try {
    const customerId = req.customer._id;

    const bookings = await Booking.find({ customer: customerId });

    return res.status(200).json({
      success: true,
      bookings,
    });

  } catch (error) {
    console.error("Get Customer Bookings Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// --------------------------------------
// DELETE BOOKING  (Customer or Admin)
// --------------------------------------
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const customerId = req.customer._id;
    const role = req.customer.role;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Prevent deleting others' bookings unless admin
    if (booking.customer.toString() !== customerId && role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this booking",
      });
    }

    await booking.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });

  } catch (error) {
    console.error("Delete Booking Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Exporting all controller functions
module.exports = {
  createBooking,
  getAllBookingsAdmin,
  getCustomerBookings,
  deleteBooking,
};
