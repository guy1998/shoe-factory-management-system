const express = require("express");
const router = express();
const articleController = require("../controllers/articleController");
const login_controller = require("../controllers/UserProxy");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

router.use(bodyParser.json());
router.use(cookieParser());

router.post("/create", (req, res) => {
  login_controller.authorize(req, res, () => {
    articleController.createArticle(req, res);
  });
});

router.get("/article/:articleId", (req, res) => {
  login_controller.authorize(req, res, () => {
    articleController.getArticleById(req, res);
  });
});

router.get("/articleByCode", (req, res) => {
  login_controller.authorize(req, res, () => {
    articleController.getArticleByCode(req, res);
  });
});

router.get("/articleByCost", (req, res) => {
  login_controller.authorize(req, res, () => {
    articleController.getArticleByCost(req, res);
  });
});

router.get("/allArticles", (req, res) => {
  login_controller.authorize(req, res, () => {
    articleController.getAllArticles(req, res);
  });
});

router.put("/updateCost", (req, res) => {
  login_controller.authorize(req, res, () => {
    articleController.updateCost(req, res);
  });
});

router.put("/updateProduct", (req, res)=>{
  login_controller.authorize(req, res, ()=>{
    articleController.updateProduct(req, res);
  })
})

router.delete("/deleteById/:articleId", (req, res) => {
  login_controller.authorize(req, res, () => {
    articleController.deleteArticleById(req, res);
  });
});

router.delete("/deleteByCode", (req, res) => {
  login_controller.authorize(req, res, () => {
    articleController.deleteArticleByCode(req, res);
  });
});

module.exports = router;
