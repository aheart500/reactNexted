const mongoose = require("mongoose");

const reportSchema = mongoose.Schema({
  name: String,
  text: String,
  reportedId: String,
  reportedName: String,
  phone: String,
  done: { type: Boolean, default: false },
});

module.exports =
  mongoose.models.report || mongoose.model("report", reportSchema);
