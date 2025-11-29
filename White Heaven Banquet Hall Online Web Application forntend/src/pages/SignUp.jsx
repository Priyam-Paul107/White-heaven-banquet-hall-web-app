import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faFile,
  faLocationCrosshairs,
  faKey,
  faMessage,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { registerCustomer } from "../../services/axiosClientService";
import { AppContext } from "../context/AppContext";
export default function SignUp() {
  const {navigate}= useContext(AppContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    mobileNo: "",
    address: "",
    profileImage: null,
  });
  const validate = () => {
    
    const e = [];
    if (!formData.name.trim()) e.push( "Name is required") ;
    if (!formData.email.trim()) e.push( "email is required") ;
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) e.push( "Enter a valid email");
    if (!formData.mobileNo.trim()) e.push( "mobileNo is required") ;
    if (!(formData.password.length>=3)) e.push( "Password should be greater than 3 character");
    return e;
  };
  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const submitHandler = async(e) => {
    e.preventDefault();
    try {
      const err=validate();
      console.log(err);
      
      err.map(e=>toast.error(e))
     const res= await registerCustomer(formData);
     toast.success("Sign Up successfully")
     navigate("/login")
    } catch (error) {
      console.error(error);

      toast.error("SignUp failed");
    }
  };
  return (
        <div
      className="h-min bg-cover bg-center bg-no-repeat -mt-40 mb-10"
      style={{ backgroundImage: "url('/banquets/cover.png')" }}
    >
    <section className="relative opacity-95 h-full py- bg-gray-50 sm:py-16 lg:py-24 py-12 ">
    <div className="flex justify-center">
      <form
        encType="multipart/form-data"
        onSubmit={submitHandler}
        className=" bg-white text-gray-500 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <div className="mb-5 flex items-center justify-center">
          <img src="logo.png" />
          <div className="mt-2 flex flex-col items-center">
            <span className="text-xl ">
              <b>White Heaven</b>
            </span>{" "}
            <span>Banquet Halls</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">
          Sign Up
        </h2>
        <div className="flex items-center my-2 border bg-gray-200 border-gray-500/10 rounded gap-1 pl-2">
          <FontAwesomeIcon icon={faUser} />
          <input
            name="name"
            onChange={handleChange}
            value={formData.name || ""}
            className="w-full outline-none bg-transparent py-2.5"
            type="text"
            placeholder="name"
            required
          />
        </div>
        <div className="flex items-center my-2 border bg-gray-200 border-gray-500/10 rounded gap-1 pl-2">
          <FontAwesomeIcon icon={faMessage} />
          <input
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className="w-full outline-none bg-transparent py-2.5"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="flex items-center mt-2 mb-8 border bg-gray-200 border-gray-500/10 rounded gap-1 pl-2">
          <FontAwesomeIcon icon={faKey} />
          <input
            name="password"
            value={formData.password || ""}
            onChange={handleChange}
            className="w-full outline-none bg-transparent py-2.5"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div className="flex items-center my-2 border -mt-6 bg-gray-200 border-gray-500/10 rounded gap-1 pl-2">
          <FontAwesomeIcon icon={faPhone} />
          <input
            name="mobileNo"
            onChange={handleChange}
            value={formData.mobileNo || ""}
            className="w-full outline-none bg-transparent py-2.5 "
            type="text"
            placeholder="mobileNo"
            required
          />
        </div>
        <div className="flex items-center my-2 border bg-gray-200 border-gray-500/10 rounded gap-1 pl-2">
          <FontAwesomeIcon icon={faLocationCrosshairs} />
          <textarea
            name="address"
            onChange={handleChange}
            value={formData.address || ""}
            className="w-full outline-none bg-transparent py-2.5 "
            type="text"
            placeholder="Address"
          />
        </div>
        <div className="flex items-center my-2 border bg-gray-200 border-gray-500/10 rounded gap-1 pl-2">
          <FontAwesomeIcon icon={faFile} />
          <input
            name="profileImage"
            onChange={handleChange}
            className="w-full outline-none bg-transparent py-2.5 cursor-pointer"
            type="file"
          />
        </div>
        <button className="w-full mb-3 bg-primary cursor-pointer hover:bg-gray-200600 transition-all active:scale-95 py-2.5 rounded text-white font-medium">
          Create Account
        </button>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
    </section>
    </div>
  );
}
