const express = require("express");
const router = express();
const dailyStatisticController = require("../controllers/dailyStatisticsController");
const login_controller = require("../controllers/UserProxy");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

router.use(bodyParser.json());
router.use(cookieParser());

router.post("/create", (req, res) => {
  login_controller.authorize(req, res, () => {
    dailyStatisticController.createDailyStatistic(req, res);
  });
});

router.put("/edit", (req, res) => {
  login_controller.authorize(req, res, () => {
    dailyStatisticController.editDailyStatistics(req, res);
  });
});

router.get("/statistics/:statisticId", (req, res) => {
  login_controller.authorize(req, res, () => {
    dailyStatisticController.getStatisticById(req, res);
  });
});

router.get("/prodCode", (req, res) => {
  login_controller.authorize(req, res, () => {
    dailyStatisticController.getStatisticByProductCode(req, res);
  });
});

router.get("/profit", (req, res) => {
  login_controller.authorize(req, res, () => {
    dailyStatisticController.getStatisticByProfit(req, res);
  });
});

router.post("/timeRange", (req, res) => {
  login_controller.authorize(req, res, () => {
    dailyStatisticController.getStatisticByTimeRange(req, res);
  });
});

router.get("/all", (req, res) => {
  login_controller.authorize(req, res, () => {
    dailyStatisticController.getAllStatistics(req, res);
  });
});

router.get("/productionCost", (req, res) => {
  login_controller.authorize(req, res, () => {
    try {
      dailyStatisticController.getTotalWorkersCost().then((cost) => {
        res.status(200).json(cost);
      });
    } catch (err) {
      res.status(500).json({ message: "Internal server error!" });
    }
  });
});

router.delete("/deleteById/:statisticId", (req, res) => {
  login_controller.authorize(req, res, () => {
    dailyStatisticController.deleteStatisticById(req, res);
  });
});

module.exports = router;
