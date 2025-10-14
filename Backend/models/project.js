const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: String,
  description: String,
  dateCreated: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Project", projectSchema);