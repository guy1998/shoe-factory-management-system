const mongoose = require("mongoose");
const { Schema } = mongoose;
const { Decimal128 } = require("mongodb");

const articleSchema = new Schema({
  code: { type: String, required: true },
  costPerArticle: { type: Decimal128, required: true },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
