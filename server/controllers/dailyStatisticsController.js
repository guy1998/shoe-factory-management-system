const DailyStatistics = require("../models/dailyStatistics");
const Workers = require("../models/workers");
const Article = require("../models/article");
const articleController = require("../controllers/articleController");
const { Decimal128 } = require("mongodb");

const getTotalWorkersCost = async () => {
  const workers = await Workers.find({});
  const totalWorkersCost = workers.reduce(
    (total, worker) => total + worker.costPerDay,
    0
  );
  return totalWorkersCost;
};

const createDailyStatistic = async (req, res) => {
  try {
    let totalEarned = 0;
    const { products } = req.body;

    products.forEach((product) => {
      const cost1 = parseFloat(product.costPerArticle.$numberDecimal.toString());
      totalEarned += product.quantity * cost1;
    });

    const productionCost = await getTotalWorkersCost();
    const profit = totalEarned - parseFloat(productionCost.toString());

    const newDailyStatistic = new DailyStatistics({
      products: products.map((product) => ({
        code: product.code,
        quantity: product.quantity,
        cost: Decimal128.fromString(product.costPerArticle.$numberDecimal.toString()),
      })),
      productionCost: Decimal128.fromString(productionCost.toString()),
      profit: Decimal128.fromString(profit.toString()),
      earned: totalEarned,
    });
    const savedStatistic = await newDailyStatistic.save();
    res.status(201).json(savedStatistic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const editDailyStatistics = async (req, res) => {
  try {
    let totalEarned = 0;
    const { products, statId } = req.body;

    products.forEach((product) => {
      const cost1 = parseFloat(
        product.cost.$numberDecimal
          ? product.cost.$numberDecimal.toString()
          : product.cost.toString()
      );
      totalEarned += product.quantity * cost1;
    });
    const stat = await DailyStatistics.findById(statId);

    const profit = totalEarned - parseFloat(stat.productionCost.toString());
    stat.profit = profit;
    stat.products = products;
    stat.earned = totalEarned;
    await stat.save();
    res.status(200).json("Saved successfully!");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getStatisticById = async (req, res) => {
  try {
    const statisticId = req.params.statisticId;
    const statistic = await DailyStatistics.findById(statisticId);
    if (!statistic) {
      return res.status(404).json({ error: "Statistic not found" });
    }
    res.status(200).json(statistic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getStatisticByProductCode = async (req, res) => {
  try {
    const { productCode } = req.body;
    const statistic = await DailyStatistics.find({
      "products.code": productCode,
    });
    if (!statistic) {
      return res.status(404).json({ error: "Statistic not found" });
    }
    res.status(200).json(statistic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllStatistics = async (req, res) => {
  try {
    const statistic = await DailyStatistics.find();
    res.status(200).json(statistic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getStatisticByProfit = async (req, res) => {
  try {
    const { profit } = req.body;
    const profitDecimal = Decimal128.fromString(profit.toString());
    const statistic = await DailyStatistics.find({ profit: profitDecimal });
    if (!statistic) {
      return res.status(404).json({ error: "Statistic not found" });
    }
    res.status(200).json(statistic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getStatisticByTimeRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    
    const statistic = await DailyStatistics.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    });
    if (!statistic) {
      return res.status(404).json({ error: "Statistic not found" });
    }
    res.status(200).json(statistic);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

const deleteStatisticById = async (req, res) => {
  try {
    const statisticId = req.params.statisticId;
    const deletedStatistic = await DailyStatistics.findByIdAndDelete(
      statisticId
    );
    if (!deletedStatistic) {
      return res.status(404).json({ error: "Statistic not found" });
    }
    res.status(200).json({ message: "Statistic deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createDailyStatistic,
  getAllStatistics,
  getStatisticById,
  getStatisticByProfit,
  getStatisticByProductCode,
  getStatisticByTimeRange,
  deleteStatisticById,
  getTotalWorkersCost,
  editDailyStatistics,
};
