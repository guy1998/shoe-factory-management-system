import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import MDBox from "../../../../components/MDBox";
import { useMediaQuery } from "@mui/material";
import MDButton from "../../../../components/MDButton";
import { useMaterialUIController } from "../../../../context";
import { addUser } from "./scripts/user-scripts";

function UserCreateContent() {
  const isMobile = useMediaQuery("(max-width: 599px)");
  const navigator = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notification = { add: enqueueSnackbar, close: closeSnackbar };
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  return (
    <MDBox
      style={{
        margin: "0 auto",
        width: isMobile ? "100%" : "70%",
        height: "90%",
        backgroundColor: darkMode ? "rgba(255, 255, 255, 0.08)" : "#F4F4F4",
        borderRadius: "15px",
        boxShadow:
          "0px 10px 15px rgba(0, 0, 0, 0.3), 0px 15px 30px rgba(0, 0, 0, 0.22)",
      }}
      py={3}
    >
      <div
        style={{
          width: "90%",
          borderBottom: "2px solid gainsboro",
          margin: "5px auto 15px auto",
          color: darkMode ? "white" : "black",
        }}
      >
        <h3>Creare un nuovo utente</h3>
      </div>
      <div style={{ width: "90%", margin: "0 auto" }}>
        <TextField
          id="outlined-basic"
          label="Nome"
          variant="outlined"
          fullWidth
          style={{ margin: "10px 0" }}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Cognome"
          variant="outlined"
          fullWidth
          style={{ margin: "10px 0" }}
          value={surname}
          onChange={(event) => setSurname(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          fullWidth
          style={{ margin: "10px 0" }}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          fullWidth
          style={{ margin: "10px 0" }}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          width: "90%",
          margin: "300px auto 0 auto",
          borderTop: "2px solid gainsboro",
          height: "70px",
        }}
      >
        <MDButton
          style={{ marginRight: "8px" }}
          color="info"
          onClick={() => {
            addUser(notification, navigator, {
              name,
              surname,
              username,
              password,
            });
          }}
        >
          <Icon style={{ marginRight: "5px" }}>check</Icon>
          Conferma
        </MDButton>
        <MDButton
          color="primary"
          onClick={() => {
            navigator("/app/user");
          }}
        >
          <Icon style={{ marginRight: "5px" }}>close</Icon>
          Anulla
        </MDButton>
      </div>
    </MDBox>
  );
}

export default UserCreateContent;
