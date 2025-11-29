import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { updateBanquetById } from "../../../services/axiosClientService";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Logo from "../../components/Logo";

// BanquetRegistrationForm.jsx
// Single-file React component (TailwindCSS required in your project)
// Usage: import BanquetRegistrationForm from './BanquetRegistrationForm';

export default function UpdateBanquetForm() {
  const { id } = useParams(); // banquet ID from URL
  const { navigate } = useContext(AppContext);
  const { state } = useLocation(); // banquet data passed
  const banquet = state?.banquet; // full object

  const [form, setForm] = useState({
    name: banquet?.name || "",
    ownerEMail: banquet?.ownerEMail || "",
    mobileNo: banquet?.mobileNo || "",
    capacity: banquet?.capacity || "",
    type: banquet?.type || "",
    location: banquet?.location || "",
    charge: banquet?.charge || "",
    description: banquet?.description || "",
    BanquetName: banquet?.BanquetName || "",
  });
  if (!banquet) return <p>No banquet data received</p>;

  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Basic client-side validation
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.ownerEMail.trim()) e.ownerEMail = "ownerEMail is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.ownerEMail))
      e.ownerEMail = "Enter a valid ownerEMail";
    if (!form.mobileNo.trim()) e.mobileNo = "mobileNo is required";
    if (!form.BanquetName) e.BanquetName = "Banquet Name is required";
    if (!form.capacity || Number(form.capacity) <= 0)
      e.capacity = "capacitys must be a positive number";
    if (!form.type) e.type = "Select banquet type";
    if (!coverImage) e.coverImage = "Please upload a cover image";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCoverImage(file);
    setCoverPreview(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, coverImage: undefined }));
  };

  const handleAdditionalUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 6); // limit to 6
    setAdditionalImages(files);
  };

  const handleRemoveAdditional = (index) => {
    setAdditionalImages((imgs) => imgs.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setForm({
      name: "",
      ownerEMail: "",
      mobileNo: "",
      capacity: "",
      type: "",
      location: "",
      charge: "",
      description: "",
      BanquetName: "",
    });
    setCoverImage(null);
    setCoverPreview(null);
    setAdditionalImages([]);
    setErrors({});
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    const eObj = validate();
    setErrors(eObj);
    if (Object.keys(eObj).length) return;

    // prepare FormData
    const fd = new FormData();
    Object.keys(form).forEach((k) => fd.append(k, form[k]));
    fd.append("coverImage", coverImage);
    additionalImages.forEach((file, idx) =>
      fd.append(`additionalImages`, file)
    );

    setSubmitting(true);

    try {
      const res = await updateBanquetById(id, fd);
      setSuccessMessage("Banquet updated successfully!");
      toast.success("Banquet updated successfully!");
      navigate("/banquets");
    } catch (err) {
      toast.error(err);
      console.error(err);
      setErrors((prev) => ({
        ...prev,
        submit: err.message || "Submission failed",
      }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="h-min bg-cover bg-center bg-no-repeat -mt-40 mb-10"
      style={{ backgroundImage: "url('/banquets/cover.png')" }}
    >
      <section className="relative opacity-90 h-full py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div className="container mx-auto p-4 max-w-3xl flex flex-col">
          <div className=" flex justify-center">
            <Logo />
          </div>
          <div className="max-w-4xl mx-auto p-6">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-3xl font-semibold mb-4"
            >
              Banquet Registration
            </motion.h1>

            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="space-y-6 bg-white p-6 rounded-2xl shadow-md"
            >
              {/* contact row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex flex-col">
                  <span className="text-sm font-medium">Name</span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className={`mt-1 p-2 rounded-md border ${
                      errors.BanquetNamea ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="Owner / Manager name"
                  />
                  {errors.name && (
                    <small className="text-red-500">{errors.name}</small>
                  )}
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium">Email</span>
                  <input
                    name="ownerEMail"
                    value={form.ownerEMail}
                    onChange={handleChange}
                    className={`mt-1 p-2 rounded-md border ${
                      errors.ownerEMail ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="contact@example.com"
                  />
                  {errors.ownerEMail && (
                    <small className="text-red-500">{errors.ownerEMail}</small>
                  )}
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium">mobileNo</span>
                  <input
                    name="mobileNo"
                    value={form.mobileNo}
                    onChange={handleChange}
                    className={`mt-1 p-2 rounded-md border ${
                      errors.mobileNo ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="Mobile number"
                  />
                  {errors.mobileNo && (
                    <small className="text-red-500">{errors.mobileNo}</small>
                  )}
                </label>
              </div>

              {/* event row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex flex-col">
                  <span className="text-sm font-medium">Number of Guests</span>
                  <input
                    type="number"
                    name="capacity"
                    value={form.capacity}
                    onChange={handleChange}
                    className={`mt-1 p-2 rounded-md border ${
                      errors.capacity ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="e.g. 150"
                  />
                  {errors.capacity && (
                    <small className="text-red-500">{errors.capacity}</small>
                  )}
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium">Banquet Type</span>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className={`mt-1 p-2 rounded-md border ${
                      errors.type ? "border-red-500" : "border-gray-200"
                    }`}
                  >
                    <option value="">Select type</option>
                    <option value="open ground">Open ground</option>
                    <option value="indoor hall">Indoor hall</option>
                    <option value="lawn">Lawn</option>
                    <option value="rooftop">Rooftop</option>
                  </select>
                  {errors.type && (
                    <small className="text-red-500">{errors.type}</small>
                  )}
                </label>
                <label className="flex flex-col">
                  <span className="text-sm font-medium">Banquet Name</span>
                  <input
                    name="BanquetName"
                    value={form.BanquetName}
                    onChange={handleChange}
                    className={`mt-1 p-2 rounded-md border ${
                      errors.name ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="Banquet Name"
                  />
                  {errors.BanquetName && (
                    <small className="text-red-500">{errors.BanquetName}</small>
                  )}
                </label>
              </div>

              {/* location and charge */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="text-sm font-medium">
                    Address / Location
                  </span>
                  <textarea
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    rows={3}
                    className="mt-1 p-2 rounded-md border border-gray-200"
                  />
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium">
                    Charge (per event / estimate)
                  </span>
                  <input
                    name="charge"
                    value={form.charge}
                    onChange={handleChange}
                    className="mt-1 p-2 rounded-md border border-gray-200"
                    placeholder="e.g. 10000"
                  />
                </label>
              </div>

              {/* description */}
              <label className="flex flex-col">
                <span className="text-sm font-medium">Short Description</span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1 p-2 rounded-md border border-gray-200"
                  placeholder="Highlight capacity, special features, parking, menu options..."
                />
              </label>

              {/* images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="text-sm font-medium">Cover Image</span>
                  <input
                    type="file"
                    name="coverImage"
                    accept="image/*"
                    onChange={handleCoverUpload}
                    className="mt-2"
                  />
                  {errors.coverImage && (
                    <small className="text-red-500">{errors.coverImage}</small>
                  )}

                  {coverPreview && (
                    <div className="mt-3">
                      <img
                        src={coverPreview}
                        alt="cover preview"
                        className="w-full max-h-48 object-cover rounded-md shadow-sm"
                      />
                    </div>
                  )}
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium">
                    Additional Images (up to 6)
                  </span>
                  <input
                    type="file"
                    name="additionalImages"
                    accept="image/*"
                    onChange={handleAdditionalUpload}
                    multiple
                    className="mt-2"
                  />

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {additionalImages.map((file, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`add-${idx}`}
                          className="w-full h-20 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveAdditional(idx)}
                          className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md text-xs"
                          aria-label={`Remove image ${idx + 1}`}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </label>
              </div>

              {/* submit row */}
              <div className="flex items-center justify-between">
                <div>
                  {errors.submit && (
                    <p className="text-red-500">{errors.submit}</p>
                  )}
                  {successMessage && (
                    <p className="text-green-600">{successMessage}</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50"
                  >
                    Reset
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className={`px-4 py-2 rounded-xl text-white ${
                      submitting
                        ? "bg-gray-400"
                        : "bg-primary hover:bg-secondary"
                    }`}
                  >
                    {submitting ? "Submitting..." : "Updating Banquet"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
