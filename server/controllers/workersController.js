const Worker = require("../models/workers");

const createWorker = async (req, res) => {
  try {
    const { name, surname, costPerDay } = req.body;
    const newWorker = new Worker({
      name: name,
      surname: surname,
      costPerDay: costPerDay,
    });

    const savedWorker = await newWorker.save();
    res.status(201).json(savedWorker);
  } catch (err) {
    res.status(400).json({ error: "Error to create worker" });
  }
};

const getWorkerByName = async (req, res) => {
  try {
    const { name } = req.body;
    const worker = await Worker.find({ name: name });
    if (!worker) {
      return res.status(404).json({ error: "Worker not found" });
    }
    res.status(200).json(worker);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getWorkerById = async (req, res) => {
  try {
    const workerId = req.params.workerId;
    const worker = await Worker.findById(workerId);
    if (!worker) {
      return res.status(404).json({ error: "Worker not found" });
    }
    res.status(200).json(worker);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getWorkerBySurname = async (req, res) => {
  try {
    const { surname } = req.body;
    const worker = await Worker.find({ surname: surname });
    if (!worker) {
      return res.status(404).json({ error: "Worker not found" });
    }
    res.status(200).json(worker);
  } catch (err) {
    res.status(4004).json({ error: err.message });
  }
};

const getAllWorkers = async (req, res) => {
  try {
    const workers = await Worker.find();
    res.status(200).json(workers);
  } catch (err) {
    console.log(err)
    res.status(400).json({ error: err.message });
  }
};

const updateCostPerDay = async (req, res) => {
  try {
    const { workerId, newCost } = req.body;
    const updatedWorker = await Worker.findByIdAndUpdate(workerId, {
      costPerDay: newCost,
    });
    if (!updatedWorker) {
      return res.status(404).json({ error: "Worker not found" });
    }
    res.status(200).json(updatedWorker);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateWorker = async (req, res)=>{
  try{
    const { workerId, newInfo } = req.body;
    const updatedWorker = await Worker.findByIdAndUpdate(workerId, {
      ...newInfo
    });
    if (!updatedWorker) {
      res.status(404).json({ error: "Worker not found" });
    } else {
      res.status(200).json(updatedWorker);
    }
  } catch(err) {
    res.status(400).json({ error: err.message });
  }
}

const deleteWorkerById = async (req, res) => {
  try {
    const workerId = req.params.workerId;
    const deletedWorker = await Worker.findByIdAndDelete(workerId);
    if (!deletedWorker) {
      return res.status(404).json({ error: "Worker not found" });
    }
    res.status(200).json({ message: "Worker deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createWorker,
  getWorkerById,
  getWorkerByName,
  getWorkerBySurname,
  updateCostPerDay,
  deleteWorkerById,
  getAllWorkers,
  updateWorker
};
