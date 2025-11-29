import React, { useContext, useEffect, useState } from "react";
import { getAllBanquet } from "../../../services/axiosClientService";
import BanquetCard from "./BanquetCard";
import { AppContext } from "../../context/AppContext";

export default function Banquets() {
  const [banquets, setBanquets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const {navigate} =useContext(AppContext);
  // Fetch Data from Backend
  const fetchBanquets = async () => {
    try {
      const res = await getAllBanquet();

      setBanquets(res.data.data); // adjust based on your response
    } catch (err) {
      setError("Failed to load banquet data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanquets();
  }, []);

  if (loading)
    return <p className="text-center text-lg">Loading banquets...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div
      className="h-min bg-cover bg-center bg-no-repeat -mt-40 mb-10"
      style={{ backgroundImage: "url('/banquets/cover.png')" }}
    >
      <section className="relative opacity-90 h-full py-10 bg-gray-50 sm:py-16 lg:py-24">
        <button
        onClick={()=>navigate("/banquet/nearest")}
         className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full shadow-md hover:bg-secondary transition active:scale-95">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M10 6h10M4 6h2m2 12h10M4 18h2m4-6h10M4 12h2" />
          </svg>
          Sort by Nearest
        </button>

        <div className="w-full flex flex-wrap gap-6 p-6 justify-center">
          {banquets.map((b) => (
            <BanquetCard
              key={b?._id}
              id={b?._id}
              banquetName={b?.BanquetName ?? "Unnamed Hall"}
              coverImage={b?.coverImage?.path ?? ""}
              charge={b?.charge ?? 0}
              locationLat={b?.location?.coordinates?.[1] ?? 0}
              locationLng={b?.location?.coordinates?.[0] ?? 0}
              capacity={b?.capacity ?? 0}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
