const express = require("express");
const router = express();
const otherCostsControllers = require("../controllers/otherCostsControllers");
const login_controller = require("../controllers/UserProxy");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

router.use(bodyParser.json());
router.use(cookieParser());

router.post(
  "/create", (req, res) => {
    login_controller.authorize(req, res, () => {
      otherCostsControllers.createCost(req, res);
    }
    );
  });

router.get("/getByName/:name", (req, res) => {
  login_controller.authorize(req, res, () => {
    otherCostsControllers.getCostByName(req, res);
  });
});

router.get("/getTotalCosts", (req, res) => {
  login_controller.authorize(req, res, () => {
    otherCostsControllers.getTotalCosts(req, res);
  });
});

router.get("/getById/:id", (req, res) => {
  login_controller.authorize(req, res, () => {
    otherCostsControllers.getCostById(req, res);
  });
});

router.get("/allCosts", (req, res) => {
  login_controller.authorize(req, res, () => {
    otherCostsControllers.getAllCosts(req, res);
  });
});

router.post(
  "/costByTimeRange", (req, res) => {
    login_controller.authorize(req, res, () => {
      otherCostsControllers.getCostsByTimeRange(req, res)
    }
    );
  });

router.put("/updateQuantity", (req, res) => {
  login_controller.authorize(req, res, () => {
    otherCostsControllers.updateQuantity(req, res);
  });
});

router.put("/updateName", (req, res) => {
  login_controller.authorize(req, res, () => {
    otherCostsControllers.updateCostName(req, res);
  });
});

router.put('/edit', (req, res)=>{
  login_controller.authorize(req, res, ()=>{
    otherCostsControllers.updateCost(req, res);
  })
})

router.delete("/deleteById/:id", (req, res) => {
  login_controller.authorize(req, res, () => {
    otherCostsControllers.deleteCostById(req, res);
  });
});

module.exports = router;
