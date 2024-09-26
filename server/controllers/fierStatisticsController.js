const FierStatistics = require("../models/fierStatistics");
const Article = require("../models/article");
const articleController = require("../controllers/articleController");
const { Decimal128 } = require("mongodb");

const createFierStatistic = async (req, res) => {
  try {
    let totalEarned = 0;
    let costFier = 0;
    const { products } = req.body;

    products.forEach((product) => {
      const costPerArticle = parseFloat(product.price.toString());
      totalEarned += product.quantity * costPerArticle;
      costFier += product.cost * product.quantity;
    });

    const profit = totalEarned - parseFloat(costFier.toString());

    const newFierStatistic = new FierStatistics({
      products: products,
      earned: totalEarned,
      totalCost: Decimal128.fromString(costFier.toString()),
      profit: Decimal128.fromString(profit.toString()),
    });
    const savedStatistic = await newFierStatistic.save();
    res.status(201).json(savedStatistic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const editFierStatistics = async (req, res) => {
  try {
    let totalEarned = 0;
    const { products, statId } = req.body;

    products.forEach((product) => {
      const cost1 = parseFloat(product.price.toString());
      totalEarned += product.quantity * cost1;
    });
    const stat = await FierStatistics.findById(statId);

    const totalCost = products.reduce((acc, product) => {
      return acc + product.quantity * product.cost;
    }, 0);
    const profit = totalEarned - totalCost;
    stat.profit = profit;
    stat.products = products;
    stat.totalCost = totalCost;
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
    const statistic = await FierStatistics.findById(statisticId);
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
    const statistic = await FierStatistics.find({
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
    const statistic = await FierStatistics.find();
    res.status(200).json(statistic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getStatisticByProfit = async (req, res) => {
  try {
    const { profit } = req.body;
    const profitDecimal = Decimal128.fromString(profit.toString());
    const statistic = await FierStatistics.find({ profit: profitDecimal });
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
    const statistic = await FierStatistics.find({
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
    res.status(400).json({ error: error.message });
  }
};

const deleteStatisticById = async (req, res) => {
  try {
    const statisticId = req.params.statisticId;
    const deletedStatistic = await FierStatistics.findByIdAndDelete(
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
  createFierStatistic,
  getAllStatistics,
  getStatisticById,
  getStatisticByProfit,
  getStatisticByProductCode,
  getStatisticByTimeRange,
  deleteStatisticById,
  editFierStatistics,
};
