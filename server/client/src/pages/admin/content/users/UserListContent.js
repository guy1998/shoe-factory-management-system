import React, { useState, useEffect } from "react";
import { Card, Icon } from "@mui/material";
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import DataTable from "../../../../components/Tables/DataTable";
import { useSnackbar } from "notistack";
import MDButton from "../../../../components/MDButton";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./components/ConfirmModal";
import { useMediaQuery } from "@mui/material";
import { getUsers, changeUserStatus } from "./scripts/user-scripts";

function UserListContent() {
  const isMobile = useMediaQuery("(max-width: 599px)");
  const [users, setUsers] = useState([]);
  const [usersUpdated, setUsersUpdated] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notification = { add: enqueueSnackbar, close: closeSnackbar };
  const navigate = useNavigate();
  const rows = users.map((user) => {
    return {
      name: <MDTypography>{user.name}</MDTypography>,
      surname: <MDTypography>{user.surname}</MDTypography>,
      username: <MDTypography>{user.username}</MDTypography>,
      actions: (
        <MDBox style={{ display: "flex" }}>
          <ConfirmModal
            confirmAction={() => {
              changeUserStatus(
                notification,
                navigate,
                user._id,
                { status: user.status === "active" ? "banned" : "active" },
                setUsersUpdated
              );
            }}
            status={user.status}
          />
        </MDBox>
      ),
    };
  });
  const columns = [
    { Header: "Nome", accessor: "name", align: "center" },
    { Header: "Cognome", accessor: "surname", align: "center" },
    { Header: "Username", accessor: "username", align: "center" },
    { Header: "Azioni", accessor: "actions", align: "center" },
  ];

  useEffect(() => {
    getUsers(notification, navigate).then((data) => {
      if (data) setUsers(data);
    });
    setUsersUpdated(false);
  }, [usersUpdated]);

  return (
    <Card>
      <MDBox
        mx={2}
        mt={-3}
        py={3}
        px={2}
        variant="gradient"
        bgColor="info"
        borderRadius="lg"
        coloredShadow="info"
        display="flex"
        justifyContent="space-between"
      >
        <MDTypography variant="h6" color="white">
          Gli utenti
        </MDTypography>
        <MDButton
          onClick={() => {
            navigate("/app/user/create");
          }}
        >
          <Icon style={{ marginRight: "5px" }}>person_add</Icon>
          {isMobile ? "" : "Crea nuovo"}
        </MDButton>
      </MDBox>
      <MDBox pt={3}>
        <DataTable
          table={{ columns, rows }}
          isSorted={false}
          entriesPerPage={false}
          showTotalEntries={false}
          noEndBorder
        />
      </MDBox>
    </Card>
  );
}

export default UserListContent;
