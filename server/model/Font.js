const mongoose = require("mongoose");

const FontSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    fontName: {
      type: String,
      required: true,
    },
    fontDisplayName: {
      type: String,
      required: true,
    },
    fontWeights: {
      type: Array,
      default: [],
    },
    price: {
      type: String,
      default: "FREE",
    },
    type: {
      type: String,
      default: "woff2",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Font", FontSchema);
