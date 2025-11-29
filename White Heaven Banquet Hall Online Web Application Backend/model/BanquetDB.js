const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const banquetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    ownerEMail: { type: String, required: true },
    BanquetName: { type: String, required: true },
    capacity: { type: Number, required: true },
    description: { type: String, required: true },
    mobileNo: { type: String, required: true },

    // --- GEOLOCATION FIELD ---
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point"
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
      }
    },

    type: { type: String, required: true },
    charge: { type: Number, required: true },

    coverImage: {
      path: { type: String, required: true },
      filename: { type: String, required: true }
    },

    additionalImages: [
      {
        path: { type: String },
        filename: { type: String }
      }
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin"
    }
  },
  { timestamps: true }
);

banquetSchema.index({ location: "2dsphere" }); // GEO index required

banquetSchema.plugin(autoIncrement, { inc_field: "banquetId" });

module.exports = mongoose.model("Banquet", banquetSchema);
