const jwt = require("jsonwebtoken");
const customerModal = require("../model/CustomerDB");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  try {
    const { name, email, password, address, mobileNo } = req.body;
    const customer = await customerModal.findOne({ email });

    if (customer) {
      res
        .status(409)
        .json({ message: "User already exist ,you can login", success: false });
    }

    const newcustomer = new customerModal({
      name,
      email,
      password,
      address,
      mobileNo,
      role: "customer",
      profileImage: req.file
        ? {
            path: req.file.path, // uploads/profileImages/123.jpg
            filename: req.file.filename,
          }
        : {
            path: "uploads/profileImages/default.png",
            filename: "default.png",
          },
    });
    newcustomer.password = await bcrypt.hash(password, 10);
    await newcustomer.save();
    res.status(201).json({ message: "Sign Up successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error ", success: false });
  }
};
const getCustomerById = async (req, res) => {
  
  try {
    const { id } = req.params;
    const customer = await customerModal.findById(id);
    return res.status(200).json({
      success:true,
      message: "User get successfully",
      customer
    })
  } catch (error) {
    console.log(error);
    
  }
};
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, mobileNo, password, address } = req.body;

    // cover image
    req.file
      ? {
          path: req.file.path, // uploads/profileImages/123.jpg
          filename: req.file.filename,
        }
      : {
          path: "uploads/profileImages/default.png",
          filename: "default.png",
        };
    const newPassword = await bcrypt.hash(password, 10);

    let updateData = {
      name,
      email,
      mobileNo,
      password: newPassword,
      address,
      role: "customer",
      profileImage: req.files,
    };

    const updatedUser = await customerModal.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await customerModal.findOne({ email });
    if (!customer) {
      return await res
        .status(403)
        .json({ message: "Auth Failed EMail doesn't exist", success: false });
    }
    const isPassEqual = await bcrypt.compare(password, customer.password);
    if (!isPassEqual)
      return res
        .status(403)
        .json({ message: "Password dosen't match up ", success: false });
    const jwtToken = jwt.sign(
      { email: customer.email, _id: customer._id },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );
    const profileImage = `http://localhost:4000/${customer.profileImage.path}`;

    res.status(200).json({
      message: "login successfully",
      success: true,
      id: customer._id,
      jwtToken,
      email,
      profileImage,
      name: customer.name,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error ", success: false });
  }
};
module.exports = {
  signup,
  login,
  updateUser,
  getCustomerById
};
