// models/Admin.js
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobileNo: { type: String, required: true },
    address: { type: String },
    role:{
      type:String,
      required:true,
    },
    email: {
      unique: true,
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
profileImage: { path:{type: String},filename:{type:String} }
  },
  { timestamps: true }
);
const adminModal = mongoose.model("Admin",adminSchema);

module.exports = adminModal;
