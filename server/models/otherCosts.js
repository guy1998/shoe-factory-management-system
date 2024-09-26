const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Decimal128 } = require("mongodb");

const additionalCostsSchema = new Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Decimal128, required: true },
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
    isMonthly: { type: Boolean, required: true, default: false }
  },
  { timestamps: true }
);

const AdditionalCosts = mongoose.model(
  "Additional Costs",
  additionalCostsSchema
);

module.exports = AdditionalCosts;
