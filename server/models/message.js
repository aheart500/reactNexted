const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  created_at: {
    type: String,
  },
});

module.exports =
  mongoose.models.Message || mongoose.model("Message", messageSchema);
