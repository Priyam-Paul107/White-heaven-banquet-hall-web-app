// models/Payment.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    type: { type: String, required: true }      // online / cash / UPI
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
