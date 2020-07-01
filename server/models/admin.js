const mongoose = require("mongoose");

adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
