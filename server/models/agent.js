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
  countryCode: {
    required: true,
    type: Number,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

const Agent = mongoose.model("agent", agentSchema);

module.exports = Agent;
