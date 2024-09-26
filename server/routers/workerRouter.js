const express = require("express");
const router = express();
const workerController = require("../controllers/workersController");
const login_controller = require("../controllers/UserProxy");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

router.use(bodyParser.json());
router.use(cookieParser());

router.post("/create", (req, res) => {
  login_controller.authorize(req, res, () => {
    workerController.createWorker(req, res);
  });
});

router.get("/getByName", (req, res) => {
  login_controller.authorize(req, res, () => {
    workerController.getWorkerByName(req, res);
  });
});

router.get("/getById/:workerId", (req, res) => {
  login_controller.authorize(req, res, () => {
    workerController.getWorkerById(req, res);
  });
});

router.get("/getBySurname", (req, res) => {
  login_controller.authorize(req, res, () => {
    workerController.getWorkerBySurname(req, res);
  });
});

router.get("/allWorkers", (req, res) => {
  login_controller.authorize(req, res, () => {
    workerController.getAllWorkers(req, res);
  });
});

router.put("/updateCost", (req, res) => {
  login_controller.authorize(req, res, () => {
    workerController.updateCostPerDay(req, res);
  });
});

router.put("/updateEmployee", (req, res) => {
  login_controller.authorize(req, res, () => {
    workerController.updateWorker(req, res);
  });
});

router.delete("/deleteById/:workerId", (req, res) => {
  login_controller.authorize(req, res, () => {
    workerController.deleteWorkerById(req, res);
  });
});

module.exports = router;
