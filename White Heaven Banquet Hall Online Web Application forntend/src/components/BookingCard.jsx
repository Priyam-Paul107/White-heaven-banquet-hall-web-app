import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BookingCard = ({
  id,
  banquet,
  customer,
  description,
  dateStart,
  dateEnd,
  location,
  charge,
  BanquetName,
  onDelete,
  customerName,
  customerEmail,
  totalCharge
}) => {
  
  const [address, setAddress] = useState("");
  const adminIsActive = localStorage.getItem("adminIsActive");

  useEffect(() => {
    if (!location || !location.coordinates) return;
    
    // FIX: Extract correct format (lat, lon)
    const lon = location.coordinates[0];
    const lat = location.coordinates[1];
    console.log(lon,lat);

    const fetchAddress = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
          {
            headers: {
              "User-Agent": "BanquetBookingApp" // Required by Nominatim
            }
          }
        );

        const data = await res.json();
        setAddress(data.display_name || "Address not found");
      } catch (err) {
        console.error(err);
        setAddress("Address not available");
      }
    };

    fetchAddress();

  }, [location]); // FIX: Correct dependency

  return (
    <Card className="mt-6" sx={{ minWidth: 275 }}>
      <CardContent key={id} className="flex flex-wrap flex-col gap-2 m-3 ">
        <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
          Booking ID: {id}
        </Typography>

        <Typography variant="h7">
          Banquet ID: {banquet || "Loading..."}
        </Typography>

        <Typography variant="h7">
          Banquet Name: {BanquetName || "Loading..."}
        </Typography>

        <Typography variant="h7">
          Charge ₹ {charge || "Loading..."}
        </Typography>

        <Typography variant="h7">
          Location: {address || "Loading..."}
        </Typography>

        <Typography variant="h7">
          Customer ID: {customer || "Loading..."}
        </Typography>

        {adminIsActive && (
          <>
            <Typography variant="h7">
              Customer Name: {customerName || "Loading..."}
            </Typography>
            <Typography variant="h7">
              Customer Email: {customerEmail || "Loading..."}
            </Typography>
          </>
        )}

        <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
          {description}
        </Typography>

        <Typography variant="body2">
          From: {dateStart}
          <br />
          To: {dateEnd}
        </Typography>

        <Typography variant="h7">
          Total Charge: ₹{totalCharge || "Loading..."}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small">
          <Link to={"/banquet/" + banquet}>View Banquet Details</Link>
        </Button>
        <Button onClick={onDelete} size="small">
          Delete Booking
        </Button>
      </CardActions>
    </Card>
  );
};

export default BookingCard;
