// models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    banquet: { type: mongoose.Schema.Types.ObjectId, ref: "Banquet", required: true },
    description: { type: String, required: true },          // e.g., engagement, marriage
    dateStart: { type: Date, required: true },
    dateEnd: { type: Date, required: true },
    totalCharge: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
