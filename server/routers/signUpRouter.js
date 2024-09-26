const express = require("express");
const router = express();
const loginController = require("../controllers/UserProxy");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

router.use(bodyParser.json());
router.use(cookieParser());

router.post("/signUp", loginController.createUser);

module.exports = router;
