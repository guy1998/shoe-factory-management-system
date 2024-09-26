require('dotenv').config();
const express = require("express");
const app = express();
const login_controller = require("../controllers/UserProxy");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(cookieParser());
app.use(bodyParser.json());

app.get("/authorize", (req, res) => {
  login_controller.authorize(req, res, () => {
    res.status(200).json("Authorized")
  });
});

app.get("/auth-user-section", (req, res)=>{
  login_controller.authorize(req, res, ()=>{
    const myId = login_controller.retrieve_id(req);
    if(myId === process.env.SUPER_ADM_ID){
      res.status(200).json('Authorized')
    } else {
      res.status(403).json('Only the super admin can access this content!');
    }
  })
})

module.exports = app;
