const AdditionalCosts = require("../models/otherCosts");

const createCost = async (req, res) => {
  try {
    const { name, quantity, date, isMonthly } = req.body;
    const newCost = new AdditionalCosts({
      name: name,
      quantity: quantity,
      date: date,
      isMonthly: isMonthly
    });

    const savedCost = await newCost.save();
    res.status(200).json(savedCost);
  } catch (err) {
    res.status(400).json({ error: "Error to create cost" });
  }
};

const getCostByName = async (req, res) => {
  try {
    const name = req.params.name;
    const cost = await AdditionalCosts.find({ name: name });
    if (!cost) {
      return res.status(404).json({ error: "Cost not found" });
    }
    res.status(200).json(cost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getCostById = async (req, res) => {
  try {
    const id = req.params.id;
    const cost = await AdditionalCosts.findById(id);
    if (!cost) {
      return res.status(404).json({ error: "Cost not found" });
    }
    res.status(200).json(cost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllCosts = async (req, res) => {
  try {
    const costs = await AdditionalCosts.find();
    res.status(200).json(costs);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

const getCostsByTimeRange = async (req, res)=>{
  try {
    const { startDate, endDate } = req.body;
    const statistic = await AdditionalCosts.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
      isMonthly: { $ne: true },
    });
    const monthlyExpenses = await AdditionalCosts.find({
      isMonthly: true
    });
    if (!statistic || !monthlyExpenses) {
      return res.status(404).json({ error: "Statistic not found" });
    }
    res.status(200).json([...statistic, ...monthlyExpenses]);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
}

const getTotalCosts = async (req, res) => {
  try {
    const result = await AdditionalCosts.aggregate([
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: "$quantity" },
        },
      },
    ]);

    if (!result) {
      return res.status(404).json({ error: "No costs found" });
    }
    res.status(200).json({ totalQuantity: result[0].totalQuantity });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getTotalCostsByTimeRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    const results = await AdditionalCosts.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalCost: { $sum: "$quantity" },
        },
      },
    ]);

    if (results.length > 0) {
      return results[0].totalCost;
    } else {
      return Decimal128.fromString("0.00");
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateCostName = async (req, res) => {
  try {
    const { costId, newName } = req.body;
    const updatedCost = await AdditionalCosts.findByIdAndUpdate(costId, {
      name: newName,
    });
    if (!updatedCost) {
      return res.status(404).json({ error: "Cost not found" });
    }
    res.status(200).json(updatedCost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { costId, newQuantity } = req.body;
    const updatedCost = await AdditionalCosts.findByIdAndUpdate(costId, {
      quantity: newQuantity,
    });
    if (!updatedCost) {
      res.status(404).json({ error: "Cost not found" });
    } else {
      res.status(200).json(updatedCost);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteCostById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCost = await AdditionalCosts.findByIdAndDelete(id);
    if (!deletedCost) {
      return res.status(404).json({ error: "Cost not found" });
    }
    res.status(200).json({ message: "Cost deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateCost = async (req, res)=>{
  try{
    const { costId, costInfo } = req.body;
    const updatedCost = await AdditionalCosts.findByIdAndUpdate(costId, { ...costInfo });
    if(!updatedCost){
      throw new Error('This cost does not exist!');
    }
    res.status(200).json({ message: 'Cost was updated successfully!' });
  } catch(err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  createCost,
  getCostById,
  getCostByName,
  getAllCosts,
  updateCostName,
  updateQuantity,
  deleteCostById,
  getTotalCosts,
  getTotalCostsByTimeRange,
  updateCost,
  getCostsByTimeRange
};
