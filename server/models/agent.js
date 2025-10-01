const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  mobile: {
    required: true,
    type: Number,
  },
  notes: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const Agent = mongoose.model("agent", agentSchema);

module.exports = Agent;
