const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const adminModal = require("../model/AdminDB");
const customerModal = require("../model/CustomerDB");
const BookingDB = require("../model/BookingDB");
const signupAdminOnlyBackend = async (req, res) => {
    
  try {
    const { name, email, password, address, mobileNo,role } = req.body;
    const admin = await adminModal.findOne({ email });
    
    if (admin) {
      return res
        .status(409)
        .json({ message: "Admin already exist ,you can login", success: false });
    }
    const newAdmin = new adminModal({
      name,
      email,
      password,
      address,
      mobileNo,
      role,
      profileImage: req.file
        ? {
            path: req.file.path,       // uploads/profile/123.jpg
            filename: req.file.filename
          }
        : {
           path: "uploads/profile/default.png",
          filename: "default.png",
        }
        }
    
    );
    
    newAdmin.password = await bcrypt.hash(password, 10);
    await newAdmin.save();
    res.status(201).json({ message: "Sign Up successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error ", success: false });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await customerModal.find().select("-password");

    res.status(200).json({
      success: true,
      total: customers.length,
      customers,
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const deleteCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Check if customer exists
    const customer = await customerModal.findById(id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // 2️⃣ Delete all bookings related to customer
    await BookingDB.deleteOne({ customer: id });

    // 3️⃣ Delete customer
    await customerModal.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Customer and related bookings deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const Adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await adminModal.findOne({ email });
    if (!admin) {
      res.status(403).json({ message: "Auth Failed EMail doesn't exist", success: false });
    }
    if(admin.role!=="admin"){
      res.status(403).json({ message: "Auth Failed Admin doesn't exist", success: false });

    }
    
    const isPassEqual = await bcrypt.compare(password, admin.password);
    if (!isPassEqual){
      return res.status(403).json({ message: "Password dosen't match up ", success: false });}
    const jwtToken =  jwt.sign(
      { email: admin.email, _id: admin._id ,role:admin.role},
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );
          const profileImage = `http://localhost:4000/${admin.profileImage.path}`;

    res
      .status(200)
      .json({
        id:admin._id,
        message: "login successfully",
        success: true,
        jwtToken,
        email,
        profileImage,
        name: admin.name,
      });
  } catch (error) {
    res.status(500).json({ message: "Internal server error ", success: false });
  }
};
module.exports = {
  Adminlogin,
  signupAdminOnlyBackend,
  deleteCustomerById,
  getAllCustomers
};

