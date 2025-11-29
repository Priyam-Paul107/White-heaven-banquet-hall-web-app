const BanquetModal = require("../model/BanquetDB");
const BookingDB = require("../model/BookingDB");

//get all
const getAllBanquets = async (req, res) => {
  try {
    const banquets = await BanquetModal.find(); // fetch all banquets
    res.status(200).json({
      success: true,
      count: banquets.length,
      data: banquets
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

//get by id
const getBanquetById = async (req, res) => {
  try {
    const { id } = req.params; // get id from URL

    const banquet = await BanquetModal.findById(id);

    if (!banquet) {
      return res.status(404).json({
        success: false,
        message: 'Banquet not found'
      });
    }

    res.status(200).json({
      success: true,
      data: banquet
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


const nearestBanquet = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      return res.status(400).json({ success: false, message: "lat & lng are required" });
    }

    const banquets = await BanquetModal.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          key: "location",
          distanceField: "distance",
          spherical: true
        }
      }
    ]);

    res.status(200).json({ success: true, banquets });
  } catch (error) {
    console.log("GeoNear error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//post
const BanquetHallController = async (req, res) => {
  try {
    const {
      name,
      BanquetName,
      ownerEMail,
      capacity,
      type,
      charge,
      mobileNo,
      description,
      latitude,
      longitude
    } = req.body;

    // Validate coordinates
    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Latitude and Longitude are required"
      });
    }

    // COVER IMAGE
    const coverImage = req.files["coverImage"]
      ? {
          path: req.files["coverImage"][0].path,
          filename: req.files["coverImage"][0].filename,
        }
      : null;

    // ADDITIONAL IMAGES
    const additionalImages = req.files["additionalImages"]
      ? req.files["additionalImages"].map((file) => ({
          path: file.path,
          filename: file.filename,
        }))
      : [];

    // Create banquet with GeoJSON location
    const banquet = new BanquetModal({
      name,
      BanquetName,
      ownerEMail,
      capacity,
      description,
      mobileNo,

      // 🌍 GEOJSON format
      location: {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)]  
        // GeoJSON format: [lng, lat]
      },

      type,
      charge,
      coverImage,
      additionalImages,
      createdBy: req.admin.id,
    });

    await banquet.save();

    res.status(201).json({
      message: "Banquet hall added successfully",
      success: true,
      banquet,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
//update
const updateBanquet = async (req, res) => {
  try {
    const { id } = req.params;

    let updateData = { ...req.body };

    // cover image
    if (req.files?.coverImage) {
      updateData.coverImage = {
        path: req.files.coverImage[0].path,
        filename: req.files.coverImage[0].filename
      };
    }

    // additional images
    if (req.files?.additionalImages) {
      updateData.additionalImages = req.files.additionalImages.map(file => ({
        path: file.path,
        filename: file.filename
      }));
    }

    const updatedBanquet = await BanquetModal.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Banquet updated successfully",
      data: updatedBanquet,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
//delete
const deleteBanquet = async (req, res) => {
  try {
    const { id } = req.params;
    await BookingDB.deleteMany({ banquet: id });
    const deletedBanquet = await BanquetModal.findByIdAndDelete(id);
    
    if (!deletedBanquet) {
      return res.status(404).json({ success: false, message: 'Banquet not found' });
    }
  
    res.status(200).json({
      success: true,
      message: 'Banquet deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


module.exports = {nearestBanquet, BanquetHallController,getAllBanquets,getBanquetById ,updateBanquet,deleteBanquet};
