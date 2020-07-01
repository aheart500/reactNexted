const mongoose = require("mongoose");

countrySchama = new mongoose.Schema({
  name: {
    type: String,
  },
  created_at: {
    type: String,
  },
});

module.exports =
  mongoose.models.Country || mongoose.model("Country", countrySchama);
