const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: "To Do" },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" }
});

module.exports = mongoose.model("Task", taskSchema);
