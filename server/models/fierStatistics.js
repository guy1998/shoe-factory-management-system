const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Decimal128 } = require("mongodb");

const fierStatisticsSchema = new Schema(
  {
    products: [
      { code: String, quantity: Number, price: Decimal128, cost: Decimal128 },
    ],
    earned: { type: Decimal128, required: true },
    profit: { type: Decimal128, required: true },
    totalCost: { type: Decimal128, required: true },
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

const FierStatistics = mongoose.model("Fier Statistics", fierStatisticsSchema);

module.exports = FierStatistics;
