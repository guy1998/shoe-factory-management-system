const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const dailyStatisticsSchema = new Schema(
  {
    products: [{ code: String, quantity: Number, cost: Decimal128 }],
    profit: { type: Decimal128, required: true },
    productionCost: { type: Decimal128, required: true },
    earned: { type: Number, required: true },
    date: {
      type: Date,
      required: true,
      default: () => {
        const now = new Date();
        return new Date(
          Date.UTC(
            now.getFullYear(),
            now.getMonth(),
            now.getDate(),
            now.getHours(),
            now.getMinutes(),
            now.getSeconds()
          )
        );
      },
    },
  },
  { timestamps: true }
);

const DailyStatistics = mongoose.model(
  "Daily Statistics",
  dailyStatisticsSchema
);

module.exports = DailyStatistics;
