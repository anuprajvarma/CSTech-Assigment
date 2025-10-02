const Papa = require("papaparse");

const Task = require("../models/tasks");

const AddTaskHandler = async (req, res) => {
  try {
    let records = [];

    // Parse CSV
    if (req.file.mimetype === "text/csv") {
      const csvString = req.file.buffer.toString("utf-8");
      const result = Papa.parse(csvString, { header: true });
      records = result.data;
    } else {
      // Parse Excel
      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      records = sheetData;
    }

    // Validate required fields
    records = records.filter((row) => row.FirstName && row.Phone && row.Notes);

    if (records.length === 0) {
      return res.status(400).json({ error: "Invalid file format" });
    }

    // Distribute among 5 agents
    const agents = [
      "68dd9a60be9ccbf05eab3492",
      "68ddb3678b3fed3985e3a7c4",
      "68ddb3728b3fed3985e3a7c7",
      "68ddb37e8b3fed3985e3a7ca",
      "68ddb3888b3fed3985e3a7cd",
    ];
    const tasks = [];

    records.forEach((record, index) => {
      const assignedAgent = agents[index % agents.length]; // round robin
      console.log("record  " + record.Phone);
      tasks.push({
        firstName: record.FirstName,
        pnone: record.Phone,
        notes: record.Notes,
        agent: assignedAgent,
      });
    });

    console.log("task  " + tasks);

    // Save in DB
    await Task.insertMany(tasks);

    res.json({ message: "Upload successful", distributed: tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const GetTaskHandler = async (req, res) => {
  const result = await Task.find();
  res.json(result);
};

module.exports = { AddTaskHandler, GetTaskHandler };
