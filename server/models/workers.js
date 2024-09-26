const mongoose = require("mongoose");
const { Schema } = mongoose;

const workersSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  costPerDay: { type: Number, required: true },
});

const Workers = mongoose.model("Workers", workersSchema);

module.exports = Workers;
