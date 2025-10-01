const Agent = require("../models/agent");

const AddAgentHandler = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  let agent = await Agent.findOne({ email });

  if (!agent) {
    agent = await Agent.create(req.body);
    res.json(agent);
  } else {
    res.json(agent);
  }
};

module.exports = { AddAgentHandler };
