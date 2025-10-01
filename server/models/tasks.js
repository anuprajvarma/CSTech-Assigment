const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  firstName: {
    required: true,
    type: String,
  },
  pnone: {
    required: true,
    type: Number,
  },
  notes: {
    required: true,
    type: String,
  },
  agent: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Agent",
  },
});

const Task = mongoose.model("task", taskSchema);

module.exports = Task;
