const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../model/PaymentDB");
const Booking = require("../model/BookingDB");

exports.createOrder = async (req, res) => {
  try {
    const { amount, bookingId } = req.body;
    
    if (!amount || !bookingId) {
      return res.status(400).json({ success: false, message: "Amount or bookingId missing" });
    }

    const razorpay = new Razorpay({
      key_id: process.env.TEST_API_KEY,
      key_secret: process.env.TEST_KEY_SECRET,
    });

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `booking_${bookingId}`,
    };

    const order = await razorpay.orders.create(options);

    res.json({ success: true, order });

  } catch (error) {
    console.log("Create Order Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      bookingId,
      amount,
    } = req.body;
    console.log(razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      bookingId,
      amount,);
    
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSign = crypto
      .createHmac("sha256", process.env.TEST_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    await Payment.create({
      booking: bookingId,
      amount,
      type: "online",
      date: new Date(),
    });

    await Booking.findByIdAndUpdate(bookingId, { status: "Paid" });

    res.json({ success: true, message: "Payment verified" });

  } catch (error) {
    console.log("Verify Payment Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
