import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { registerBanquet } from "../../../services/axiosClientService";

// Leaflet Imports
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default Leaflet marker icons
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerIcon2xPng from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import { useEffect } from "react";
import Logo from "../../components/Logo";
import { AppContext } from "../../context/AppContext";

const markerIcon = new L.Icon({
  iconUrl: markerIconPng,
  iconRetinaUrl: markerIcon2xPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


// Center of India

// Component to capture map clicks
function LocationMarker({ setMarker, setFormData }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      setMarker([lat, lng]);
      setFormData((prev) => ({
        ...prev,
        latitude: lat,
        longitude: lng,
      }));
    },
  });

  return null;
}

export default function RegisterBanquet() {
  const [formData, setFormData] = useState({
    name: "",
    BanquetName: "",
    ownerEMail: "",
    capacity: "",
    description: "",
    mobileNo: "",
    type: "",
    charge: "",
    latitude: "",
    longitude: "",
    locationText: "",
  });
 

  const [coverImage, setCoverImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [marker, setMarker] = useState(null);
  const {navigate} =useContext(AppContext)
  // Handle Input Fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.latitude || !formData.longitude) {
      toast.error("Please select banquet location on map!");
      return;
    }

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      fd.append(key, value);
    });

    if (coverImage) fd.append("coverImage", coverImage);
    additionalImages.forEach((img) => fd.append("additionalImages", img));

    const res = await registerBanquet(fd);

    if (res.data.success) toast.success("Banquet Created Successfully!");
    else toast.error("Failed to add banquet");
    navigate("/admin/"+localStorage.getItem("adminId"))
  };

  return (
    <div
      className="h-min bg-cover bg-center bg-no-repeat -mt-40 mb-10"
      style={{ backgroundImage: "url('/banquets/cover.png')" }}
    >
      <section className="relative opacity-90 h-full py-10 bg-gray-50 sm:py-16 lg:py-24">
    
    <div className="container mx-auto p-4 max-w-3xl flex flex-col">
      <div className=" flex justify-center">
      <  Logo/>

      </div>
      <h2 className="text-2xl font-bold mb-4 text-center">Register Banquet</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Owner + Banquet Info */}
        <input className="w-full border p-2 rounded" name="name" placeholder="Owner Name" onChange={handleChange} required />
        <input className="w-full border p-2 rounded" name="BanquetName" placeholder="Banquet Hall Name" onChange={handleChange} required />
        <input className="w-full border p-2 rounded" name="ownerEMail" placeholder="Owner Email" onChange={handleChange} required />
        <input className="w-full border p-2 rounded" name="mobileNo" placeholder="Mobile Number" onChange={handleChange} required />
        <input className="w-full border p-2 rounded" type="number" name="capacity" placeholder="Capacity" onChange={handleChange} required />
        <textarea className="w-full border p-2 rounded" name="description" placeholder="Description" onChange={handleChange} required />
        <input className="w-full border p-2 rounded" name="type" placeholder="Banquet Type" onChange={handleChange} required />
        <input className="w-full border p-2 rounded" type="number" name="charge" placeholder="Charges" onChange={handleChange} required />

        {/* Optional Text Location */}
        <input
          className="w-full border p-2 rounded"
          type="text"
          name="locationText"
          placeholder="Address (optional)"
          onChange={handleChange}
        />

        {/* MAP SECTION */}
        <div className="mt-4">
          <p className="mb-2 font-semibold">Select Banquet Location on Map</p>

          <MapContainer
            center={[28.6139,77.2088]}
            zoom={5}
            style={{zIndex:"1", height: "300px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <LocationMarker setMarker={setMarker} setFormData={setFormData} />

            {marker && <Marker position={marker} icon={markerIcon} />}
          </MapContainer>

          {/* Show Lat/Lng */}
          <div className="flex gap-3 mt-3">
            <input className="border p-2 rounded w-full" placeholder="Latitude" value={formData.latitude} readOnly />
            <input className="border p-2 rounded w-full" placeholder="Longitude" value={formData.longitude} readOnly />
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="font-semibold">Cover Image</label>
          <input type="file" className="block mt-1" onChange={(e) => setCoverImage(e.target.files[0])} />
        </div>

        <div>
          <label className="font-semibold">Additional Images</label>
          <input type="file" multiple className="block mt-1" onChange={(e) => setAdditionalImages([...e.target.files])} />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-4">
          Submit
        </button>
      </form>
    </div>
    </section>
    </div>
  );
}
