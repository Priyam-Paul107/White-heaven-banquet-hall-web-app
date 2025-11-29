import React, { useEffect, useState } from "react";
import { getAllBanquet } from "../../../services/axiosClientService";
import BanquetCard from "../Banquet/BanquetCard";

// Haversine distance calculation
const getDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return Infinity;
  const R = 6371; // Radius of Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

const NearestBanquet = () => {
  const [banquets, setBanquets] = useState([]);
  const [nearest, setNearest] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [manualLat, setManualLat] = useState("");
  const [manualLon, setManualLon] = useState("");
  const [error, setError] = useState("");

  // Fetch all banquets
  useEffect(() => {
    const fetchBanquets = async () => {
      try {
        const res = await getAllBanquet();
        const banquetList = Array.isArray(res.data.data) ? res.data.data : [];
        setBanquets(banquetList);
      } catch (e) {
        console.error("Banquet Fetch Error:", e);
        setError("Failed to fetch banquets");
      }
    };
    fetchBanquets();
  }, []);

  // Get user location
  const fetchLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        console.log("Geolocation error:", err);
        alert(
          "Location permission denied or unavailable. You can enter it manually below."
        );
      }
    );
  };

  // Calculate nearest banquets
  const calculateNearest = (lat, lon) => {
    if (!lat || !lon || banquets.length === 0) return;

    const sorted = banquets
      .map((b) => ({
        ...b,
        distance: getDistance(
          lat,
          lon,
          b.location?.coordinates?.[1],
          b.location?.coordinates?.[0]
        ),
      }))
      .sort((a, b) => a.distance - b.distance);

    setNearest(sorted.slice(0, 5));
  };

  // Auto-calculate nearest when userLocation changes
  useEffect(() => {
    if (userLocation) {
      calculateNearest(userLocation.lat, userLocation.lon);
    }
  }, [userLocation, banquets]);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    const lat = parseFloat(manualLat);
    const lon = parseFloat(manualLon);
    if (!lat || !lon) {
      alert("Enter valid coordinates");
      return;
    }
    setUserLocation({ lat, lon });
    calculateNearest(lat, lon);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Nearest Banquets</h2>

      <div className="flex gap-3 mb-4">
        <button
          onClick={fetchLocation}
          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
        >
          Get My Location
        </button>
      </div>

      

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {!userLocation && (
        <p className="text-gray-700 mb-4">Fetching your location...</p>
      )}

      {nearest.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {nearest.map((b) => (
            <BanquetCard
              key={b._id}
              id={b._id}
              banquetName={b.BanquetName}
              coverImage={b.coverImage?.path}
              charge={b.charge}
              capacity={b.capacity}
              locationLat={b.location?.coordinates?.[1]}
              locationLng={b.location?.coordinates?.[0]}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No nearest banquets to display yet.</p>
      )}
    </div>
  );
};

export default NearestBanquet;
