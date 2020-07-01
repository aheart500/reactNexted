const mongoose = require("mongoose");

const vipSchema = new mongoose.Schema({
  doc: {
    type: String,
  },
});

module.exports = mongoose.models.Vip || mongoose.model("Vip", vipSchema);
