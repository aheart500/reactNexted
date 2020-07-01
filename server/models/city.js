const mongoose = require("mongoose");

citySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  country_id: {
    type: String,
  },
  created_at: {
    type: String,
  },
});

module.exports = mongoose.models.City || mongoose.model("City", citySchema);
