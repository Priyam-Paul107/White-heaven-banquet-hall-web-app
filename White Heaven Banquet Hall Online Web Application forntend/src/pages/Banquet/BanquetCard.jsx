import * as React from "react";
import { AppContext } from "../../context/AppContext";

export default function BanquetCard({
  id,
  banquetName,
  locationLat = 0,
  locationLng = 0,
  charge = 0,
  capacity = 0,
  coverImage = "",
}) {
  const { navigate } = React.useContext(AppContext);
  const [address, setAddress] = React.useState("");

  React.useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${locationLat}&lon=${locationLng}&format=json`
        );
        const data = await res.json();
        setAddress(data.display_name || "Address not found");
      } catch (err) {
        setAddress("Address not available");
      }
    };

    if (locationLat && locationLng) fetchAddress();
  }, [locationLat, locationLng]);

  function getBanquetById(id) {
    navigate("/banquet/" + id,{state:{address:address}});
  }

  return (
    <div className="w-80 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-4">
      <img
        src={"http://localhost:4000/" + coverImage}
        alt={banquetName}
        className="w-full h-44 object-cover rounded-xl"
      />
      <h2 className="text-xl font-semibold mt-3 text-gray-900">{banquetName}</h2>
      <p className="text-gray-600 text-sm">{address}</p>
      <div className="flex justify-between mt-3 text-gray-800">
        <p className="font-semibold">₹ {charge}</p>
        <p className="text-sm text-gray-700">Capacity: {capacity}</p>
      </div>
      <button
        onClick={() => getBanquetById(id)}
        className="w-full mt-4 bg-primary text-white py-2 rounded-xl hover:bg-secondary transition cursor-pointer"
      >
        View Details
      </button>
    </div>
  );
}
