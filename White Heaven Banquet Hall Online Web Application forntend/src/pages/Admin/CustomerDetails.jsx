import React, { useEffect, useState } from "react";
import { deleteCustomertById, getAllCustomer } from "../../../services/axiosClientService";
import CustomerCard from "../../components/CustomerCard";

const CustomerDetails = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const res = await getAllCustomer(); 
      setCustomers(res.data.customers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [customers]);

  if (loading) {
    return <p className="text-center text-xl font-semibold mt-10">Loading customers...</p>;
  }

const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this customer?")) return;

  try {
    await deleteCustomertById(id);
    alert("Customer deleted!");
  } catch (error) {
    console.error(error);
    alert("Delete failed");
  }
};

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">
        All Customers
      </h1>

      {customers.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No customers found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customers.map((customer) => (
            <CustomerCard key={customer._id} customer={customer} onDelete={()=>handleDelete(customer._id)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerDetails;
