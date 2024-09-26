const Article = require("../models/article");
const { Decimal128 } = require("mongodb");

async function createArticle(req, res) {
  try {
    const { code, costPerArticle } = req.body;
    const cost = Decimal128.fromString(costPerArticle.toString());
    const newArticle = new Article({
      code: code,
      costPerArticle: cost,
    });
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (err) {
    res.status(400).json({ error: "Failed to create article" });
  }
}

const getArticleById = async (req, res) => {
  try {
    const articleId = req.params.articleId;
    const article = await Article.findById(articleId);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.status(200).json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getArticleByCode = async (req, res) => {
  try {
    const { code } = req.body;
    const article = await Article.find({ code: code });
    if (!article) {
      return res.status(404).json({ err: "Article not found" });
    }
    res.status(200).json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getArticleByCost = async (req, res) => {
  try {
    const { cost } = req.body;
    const article = await Article.find({ costPerArticle: cost });
    if (!article) {
      return res.status(404).json({ err: "Article not found" });
    }

    res.status(200).json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateCost = async (req, res) => {
  try {
    const { itemId, cost } = req.body;
    const updatedItem = await Article.findByIdAndUpdate(itemId, {
      costPerArticle: cost,
    });
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { itemId, newInfo } = req.body;
    const updatedItem = await Article.findByIdAndUpdate(itemId, {
      ...newInfo,
    });
    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteArticleById = async (req, res) => {
  try {
    const articleId = req.params.articleId;
    const deletedArticle = await Article.findByIdAndDelete(articleId);
    if (!deletedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteArticleByCode = async (req, res) => {
  try {
    const { code } = req.body;
    const deletedArticle = await Article.deleteOne({ code: code });
    if (!deletedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  createArticle,
  getArticleById,
  getArticleByCode,
  getArticleByCost,
  getAllArticles,
  updateCost,
  deleteArticleById,
  deleteArticleByCode,
  updateProduct,
};
