const express = require("express");
const router = express();
const monthlyStatisticsController = require("../controllers/monthlyStatisticsController");
const login_controller = require("../controllers/UserProxy");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

router.use(bodyParser.json());
router.use(cookieParser());

router.post("/create", (req, res) => {
  login_controller.authorize(req, res, () => {
    monthlyStatisticsController.createMonthlyStatistic(req, res);
  });
});

router.get("/timeRange", (req, res) => {
  login_controller.authorize(req, res, () => {
    monthlyStatisticsController.getMonthlyStatisticByTime(req, res);
  });
});

router.get("/all", (req, res) => {
  login_controller.authorize(req, res, () => {
    monthlyStatisticsController.getAllMonthlyStatistics(req, res);
  });
});

router.delete("/deleteById/:statisticId", (req, res) => {
  login_controller.authorize(req, res, () => {
    monthlyStatisticsController.deleteMonthlyStatisticById(req, res);
  });
});

module.exports = router;
