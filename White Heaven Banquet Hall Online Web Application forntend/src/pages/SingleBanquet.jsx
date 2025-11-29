import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import {
deleteBanquetById,
getBanquetById,
} from "../../services/axiosClientService";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import ConfirmDialog from "../components/ConfirmDialog";

export default function SingleBanquet() {
const customerIsActive = localStorage.getItem("customerIsActive");
const adminIsActive = localStorage.getItem("adminIsActive");
const { id } = useParams();
const [banquet, setBanquet] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [confirmOpen, setConfirmOpen] = useState(false);

const { state } =  useLocation();  
const { customer, navigate } = useContext(AppContext);

const fetchBanquet = async () => {
try {
const res = await getBanquetById(id);
setBanquet(res.data.data);
} catch (err) {
setError("Failed to load banquet details");
} finally {
setLoading(false);
}
};
const handleCancel = () => {
setConfirmOpen(false); // close the dialog
};

const handleConfirmDelete = async () => {
try {
setConfirmOpen(false); // close dialog
await deleteBanquetById(id); // call delete API
toast.success("Banquet deleted");
navigate("/banquets");
} catch (error) {
console.log(error);
}
};

useEffect(() => {
fetchBanquet();
}, [id]);


if (loading) return <p className="text-center text-lg">Loading banquet...</p>;
if (error) return <p className="text-center text-red-500">{error}</p>;
console.log(state?.address);

return (
<div
className="h-min bg-cover bg-center bg-no-repeat -mt-40 mb-10"
style={{ backgroundImage: "url('/banquets/cover.png')" }}
> <section className="relative opacity-95 h-full py-10 bg-gray-50 sm:py-16 lg:py-24"> <div className="max-w-4xl mx-auto p-6 flex flex-col">
{/* Image */}
<img
src={`http://localhost:4000/${banquet.coverImage?.path}`}
className="w-full h-80 object-cover rounded-xl shadow"
alt="banquet"
/>

      {/* Details */}
      <h1 className="text-3xl font-semibold mt-6">
        {banquet.BanquetName.toUpperCase()}
      </h1>


      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
        <p className="text-lg">
          <span className="font-semibold p-4">Charge / Night:</span> ₹ {banquet.charge}
        </p>
        <p className="text-lg">
          <span className="font-semibold p-4">Contact Email:</span> {banquet.ownerEMail.toUpperCase()}
        </p>
        <p className="text-lg">
          <span className="font-semibold p-4">Banquet Owner Name:</span> {banquet.name.toUpperCase()}
        </p>
        <p className="text-lg">
          <span className="font-semibold p-4">Contact No:</span> +91 {banquet.mobileNo}
        </p>
        <p className="text-lg">
          <span className="font-semibold p-4">Banquet Type:</span> {banquet.type.toUpperCase()}
        </p>
        <p className="text-lg">
          <span className="font-semibold p-4">Description:</span> {banquet.description.toUpperCase()}
        </p>
        <p className="text-lg mt-2">
          <span className="font-semibold p-4">Capacity:</span> {banquet.capacity} People
        </p>
        <p className="text-lg mt-2">
          <span className="font-semibold p-4">Address:</span> {state?.address || "Fetching address..."}

        </p>

        <div className="text-lg mt-2">
          <span className="font-semibold p-4">Additional Images:</span>
          <div className="mt-5 flex justify-start gap-4 flex-wrap">
            {banquet.additionalImages?.map((item, i) => (
              <img
                key={i}
                src={`http://localhost:4000/${item.path}`}
                className="w-70 h-80 object-cover rounded-xl shadow"
                alt="banquet"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Book/Edit/Delete Buttons */}
      {customerIsActive ? (
        <button
          className="mt-6 cursor-pointer bg-primary text-white px-6 py-3 rounded-xl hover:bg-secondary transition"
          onClick={() => {
            if (customer) {
              navigate("/customer/booking", {
                state: {
                  banquetId: banquet._id,
                  banquetName: banquet.BanquetName,
                  charge: banquet.charge,
                  location: state?.address,
                },
              });
            } else {
              toast.error("You need to login first");
              navigate("/login");
            }
          }}
        >
          Book Now
        </button>
      ) : adminIsActive ? (
        <>
          <button
            className="mt-6 cursor-pointer bg-primary text-white px-6 py-3 rounded-xl hover:bg-secondary transition"
            onClick={() =>
              navigate(`/admin/edit-banquet/${banquet._id}`, { state: { banquet } })
            }
          >
            Edit Banquet
          </button>

          <button
            className="mt-6 cursor-pointer bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition"
            onClick={() => setConfirmOpen(true)}
          >
            Delete Banquet
          </button>
        </>
      ) : (
        <button
          className="mt-6 cursor-pointer bg-primary text-white px-6 py-3 rounded-xl hover:bg-secondary transition"
          onClick={() => navigate("/login")}
        >
          For Booking Login/SignUp First
        </button>
      )}
    </div>
  </section>

  <ConfirmDialog
    open={confirmOpen}
    title="Delete Banquet"
    message="This will permanently delete the Banquet. Are you sure?"
    confirmLabel="Delete"
    cancelLabel="Cancel"
    onConfirm={handleConfirmDelete}
    onCancel={handleCancel}
  />
</div>


);
}
