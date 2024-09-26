/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

// @mui material components
import Divider from "@mui/material/Divider";
import Switch from "@mui/material/Switch";
import Icon from "@mui/material/Icon";
import { TextField } from "@mui/material";
// @mui icons
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

// Material Dashboard 2 React components
import MDBox from "../MDBox/index.js";
import MDTypography from "../MDTypography/index.js";
import MDButton from "../MDButton/index.js";

// Custom styles for the Configurator
import ConfiguratorRoot from "./ConfiguratorRoot";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setOpenConfigurator,
  setTransparentSidenav,
  setWhiteSidenav,
  setFixedNavbar,
  setSidenavColor,
  setDarkMode,
} from "../../context";

import { getUserInfo, editUser } from "./scripts/user-scripts.js";
import ChangePasswordModal from "./ChangePasswordModal.js";

const checkForChanges = (edited, user) => {
  return (
    edited.name !== user.name ||
    edited.surname !== user.surname ||
    edited.username !== user.username
  );
};

function Configurator() {
  const [controller, dispatch] = useMaterialUIController();
  const [user, setUser] = useState(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notification = { add: enqueueSnackbar, close: closeSnackbar };
  const navigate = useNavigate();
  const [edited, setEdited] = useState({
    name: "",
    surname: "",
    username: "",
  });
  const {
    openConfigurator,
    fixedNavbar,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [disabled, setDisabled] = useState(false);
  const sidenavColors = [
    "primary",
    "dark",
    "info",
    "success",
    "warning",
    "error",
  ];

  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    // The event listener that's calling the handleDisabled function when resizing the window.
    window.addEventListener("resize", handleDisabled);

    // Call the handleDisabled function to set the state with the initial value.
    handleDisabled();

    //get the user info
    getUserInfo(notification, navigator).then((data) => {
      if (data) {
        setUser(data);
        setEdited({ ...data });
      }
    });

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
  const handleTransparentSidenav = () => {
    setTransparentSidenav(dispatch, true);
    setWhiteSidenav(dispatch, false);
  };
  const handleWhiteSidenav = () => {
    setWhiteSidenav(dispatch, true);
    setTransparentSidenav(dispatch, false);
  };
  const handleDarkSidenav = () => {
    setWhiteSidenav(dispatch, false);
    setTransparentSidenav(dispatch, false);
  };
  const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);
  const handleDarkMode = () => setDarkMode(dispatch, !darkMode);

  // sidenav type buttons styles
  const sidenavTypeButtonsStyles = ({
    functions: { pxToRem },
    palette: { white, dark, background },
    borders: { borderWidth },
  }) => ({
    height: pxToRem(39),
    background: darkMode ? background.sidenav : white.main,
    color: darkMode ? white.main : dark.main,
    border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,

    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode ? background.sidenav : white.main,
      color: darkMode ? white.main : dark.main,
      border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,
    },
  });

  // sidenav type active button styles
  const sidenavTypeActiveButtonStyles = ({
    functions: { pxToRem, linearGradient },
    palette: { white, gradients, background },
  }) => ({
    height: pxToRem(39),
    background: darkMode
      ? white.main
      : linearGradient(gradients.dark.main, gradients.dark.state),
    color: darkMode ? background.sidenav : white.main,

    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode
        ? white.main
        : linearGradient(gradients.dark.main, gradients.dark.state),
      color: darkMode ? background.sidenav : white.main,
    },
  });

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}
      >
        <MDBox>
          <MDTypography variant="h5">Impostazioni</MDTypography>
          <MDTypography variant="body2" color="text">
            Gestisci il tuo profilo
          </MDTypography>
        </MDBox>

        <Icon
          sx={({ typography: { size }, palette: { dark, white } }) => ({
            fontSize: `${size.lg} !important`,
            color: darkMode ? white.main : dark.main,
            stroke: "currentColor",
            strokeWidth: "2px",
            cursor: "pointer",
            transform: "translateY(5px)",
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </MDBox>

      <Divider />

      <MDBox pt={0.5} pb={3} px={3}>
        <MDBox></MDBox>

        <MDBox mt={3} lineHeight={1}>
          <MDTypography variant="h6">Informazione generale</MDTypography>
          <MDTypography variant="button" color="text">
            Modificare le informazioni
          </MDTypography>

          <MDBox
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: 2,
              mr: 1,
            }}
          >
            <TextField
              variant="outlined"
              label="Nome"
              value={edited?.name}
              onChange={(event) =>
                setEdited({ ...edited, name: event.target.value })
              }
              sx={{ marginBottom: "15px", marginTop: "15px" }}
            />
            <TextField
              variant="outlined"
              label="Cognome"
              value={edited?.surname}
              onChange={(event) =>
                setEdited({ ...edited, surname: event.target.value })
              }
              sx={{ marginBottom: "15px" }}
            />
            <TextField
              variant="outlined"
              label="Username"
              value={edited?.username}
              onChange={(event) =>
                setEdited({ ...edited, username: event.target.value })
              }
              sx={{ marginBottom: "15px" }}
            />
            <MDButton
              color="info"
              onClick={() => {
                if (checkForChanges(edited, user)) {
                  editUser(notification, navigate, edited, () => {
                    setUser({ ...edited });
                  });
                } else {
                  notification.add("No changes detected!", { variant: "info" });
                }
              }}
            >
              <Icon sx={{ marginRight: "5px" }}>check</Icon>
              Conferma
            </MDButton>
          </MDBox>
        </MDBox>
        <Divider />
        <MDBox mt={3} lineHeight={1}>
          <MDTypography variant="h6">Credenziali</MDTypography>
          <MDTypography variant="button" color="text">
            Modificare la password
          </MDTypography>
          <MDBox
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: 2,
              mr: 1,
            }}
          >
            <ChangePasswordModal />
          </MDBox>
        </MDBox>
        <Divider />
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          lineHeight={1}
        >
          <MDTypography variant="h6">Light / Dark</MDTypography>

          <Switch checked={darkMode} onChange={handleDarkMode} />
        </MDBox>
        <Divider />
      </MDBox>
    </ConfiguratorRoot>
  );
}

export default Configurator;
