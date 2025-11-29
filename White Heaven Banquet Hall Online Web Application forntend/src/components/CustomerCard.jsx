import React from "react";

export default function CustomerCard({ customer, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 w-full max-w-sm border border-gray-200">
      <div className="flex items-center gap-4">
        <img
          src={
            customer.profileImage?.path
              ? `http://localhost:4000/${customer.profileImage.path}`
              : "/default-avatar.png"
          }
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border"
        />

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {customer.name}
          </h2>
          <p className="text-sm text-gray-600">{customer.email}</p>
          <p className="text-sm text-gray-600">{customer.mobileNo}</p>
        </div>
      </div>

      <div className="mt-3 text-gray-700 text-sm">
        <p>
          <strong>Address:</strong>{" "}
          {customer.address || "No address provided"}
        </p>
        <p>
          <strong>Role:</strong> {customer.role}
        </p>
      </div>

      <div className="flex justify-between mt-5">
       

        <button
          onClick={() => onDelete(customer._id)}
          className="px-3 py-2 m-auto text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
