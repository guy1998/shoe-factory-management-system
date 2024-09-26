const express = require("express");
const router = express();
const fierStatisticsController = require("../controllers/fierStatisticsController");
const login_controller = require("../controllers/UserProxy");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

router.use(bodyParser.json());
router.use(cookieParser());

router.post("/create", (req, res) => {
  login_controller.authorize(req, res, () => {
    fierStatisticsController.createFierStatistic(req, res);
  });
});

router.put("/edit", (req, res) => {
  login_controller.authorize(req, res, () => {
    fierStatisticsController.editFierStatistics(req, res);
  });
});

router.get("/statistics/:statisticId", (req, res) => {
  login_controller.authorize(req, res, () => {
    fierStatisticsController.getStatisticById(req, res);
  });
});

router.get("/prodCode", (req, res) => {
  login_controller.authorize(req, res, () => {
    fierStatisticsController.getStatisticByProductCode(req, res);
  });
});

router.get("/profit", (req, res) => {
  login_controller.authorize(req, res, () => {
    fierStatisticsController.getStatisticByProfit(req, res);
  });
});

router.post("/timeRange", (req, res) => {
  login_controller.authorize(req, res, () => {
    fierStatisticsController.getStatisticByTimeRange(req, res);
  });
});

router.get("/all", (req, res) => {
  login_controller.authorize(req, res, () => {
    fierStatisticsController.getAllStatistics(req, res);
  });
});

router.delete("/deleteById/:statisticId", (req, res) => {
  login_controller.authorize(req, res, () => {
    fierStatisticsController.deleteStatisticById(req, res);
  });
});

module.exports = router;
