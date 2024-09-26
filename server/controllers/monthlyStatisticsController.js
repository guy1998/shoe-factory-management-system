const DailyStatistics = require("../models/dailyStatistics");
const MonthlyStatistics = require("../models/monthlyStatistics");
const { Decimal128 } = require("mongodb");

const createMonthlyStatistic = async (req, res) => {
  try {
    const { month, year } = req.body;

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const dailyStatistics = await DailyStatistics.find({
      createdAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    let totalEarned = 0;
    let totalProductionCost = 0;
    let totalProfit = 0;

    dailyStatistics.forEach((stat) => {
      totalEarned += parseFloat(stat.earned.toString());
      totalProductionCost += parseFloat(stat.productionCost.toString());
      totalProfit += parseFloat(stat.profit.toString());
    });

    const newMonthlyStatistic = new MonthlyStatistics({
      month,
      year,
      totalEarned: Decimal128.fromString(totalEarned.toString()),
      productionCost: Decimal128.fromString(totalProductionCost.toString()),
      profit: Decimal128.fromString(totalProfit.toString()),
    });

    const savedMonthlyStatistic = await newMonthlyStatistic.save();
    res.status(201).json(savedMonthlyStatistic);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
};

const getMonthlyStatisticByTime = async (req, res) => {
  try {
    const { month, year } = req.body;
    const statistic = await MonthlyStatistics.findOne({
      month: month,
      year: year,
    });
    if (!statistic) {
      return res.status(404).json({ error: "Monthly statistic not found" });
    }
    res.status(200).json(statistic);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllMonthlyStatistics = async (req, res) => {
  try {
    const statistics = await MonthlyStatistics.find();
    res.status(200).json(statistics);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteMonthlyStatisticById = async (req, res) => {
  try {
    const statisticId = req.params.statisticId;
    const deletedStatistic = await MonthlyStatistics.findByIdAndDelete(
      statisticId
    );
    if (!deletedStatistic) {
      return res.status(404).json({ error: "Monthly statistic not found" });
    }
    res.status(200).json({ message: "Monthly statistic deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createMonthlyStatistic,
  getMonthlyStatisticByTime,
  getAllMonthlyStatistics,
  deleteMonthlyStatisticById,
};
