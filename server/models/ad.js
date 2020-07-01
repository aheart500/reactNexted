const mongoose = require("mongoose");

const adSchema = mongoose.Schema({
  position: String,
  shown: Boolean,
  content: String,
});

module.exports = mongoose.models.ad || mongoose.model("ad", adSchema);
