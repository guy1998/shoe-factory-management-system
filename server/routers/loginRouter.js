const express = require("express");
const app = express();
const login_controller = require("../controllers/UserProxy");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(cookieParser());
app.use(bodyParser.json());

app.post("/login", async (req, res) => {
  const login_result = await login_controller.login_process(
    req.body.username,
    req.body.password
  );
  if (login_result.token_obj.accessToken) {
    res.cookie("tokenCookie", login_result.token_obj, {
      maxAge: 3600000,
      httpOnly: true,
      secure: true, //when true it implies https
      sameSite: "none",
    });
    res.status(200).json("User authenticated successfully!");
  } else {
    res.status(401).json(login_result.message);
  }
});

app.post("/logout", async (req, res) => {
  await login_controller.logOut(res);
});

app.get("/user-info", async (req, res) => {
  login_controller.authorize(req, res, () => {
    login_controller.serveMyInfo(req, res);
  });
});

app.put("/edit-user", async (req, res) => {
  login_controller.authorize(req, res, () => {
    login_controller
      .editUser(login_controller.retrieve_id(req), req.body.newInfo)
      .then((response) => {
        if (response.result) {
          res.status(200).json("Edited successfully");
        } else {
          res.status(400).json("Could not edit!");
        }
      });
  });
});

app.put("/change-password", async (req, res) => {
  login_controller.authorize(req, res, () => {
    const { newPassword, oldPassword } = req.body;
    const id = login_controller.retrieve_id(req);
    login_controller
      .changePassword(id, newPassword, oldPassword)
      .then((response) => {
        if (response.result) {
          res.status(200).json("Password changed successfully");
        } else {
          res.status(400).json({ message: response.message });
        }
      });
  });
});

app.post("/create-user", async (req, res) => {
  login_controller.authorize(req, res, () => {
    login_controller.createUser(req, res);
  });
});

app.get("/get-users", async (req, res) => {
  login_controller.authorize(req, res, () => {
    login_controller.getUsers(req, res);
  });
});

app.put("/change-status", async (req, res) => {
  login_controller.authorize(req, res, () => {
    login_controller
      .editUser(req.body.userId, req.body.newInfo)
      .then((response) => {
        if (response.result) {
          res.status(200).json("Edited successfully");
        } else {
          res.status(400).json("Could not edit!");
        }
      });
  });
});

module.exports = app;
