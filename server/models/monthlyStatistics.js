const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Decimal128 } = require("mongodb");

const MonthlyStatisticsSchema = new Schema({
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  totalEarned: { type: Decimal128, required: true },
  productionCost: { type: Decimal128, required: true },
  profit: { type: Decimal128, required: true },
}, { timestamps: true });

const MonthlyStatistics = mongoose.model("MonthlyStatistics", MonthlyStatisticsSchema);

module.exports = MonthlyStatistics;
