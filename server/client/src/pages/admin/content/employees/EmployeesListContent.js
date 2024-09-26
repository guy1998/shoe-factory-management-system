import React, { useEffect, useState } from "react";
import { Card, Icon } from "@mui/material";
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import DataTable from "../../../../components/Tables/DataTable";
import { useSnackbar } from "notistack";
import { useMediaQuery } from "@mui/material";
import MDButton from "../../../../components/MDButton";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./components/ConfirmModal";

import { getEmployees, deleteEmployee } from "./scripts/employee-scripts";
import TotalMoney from "./components/TotalMoney";
import MDInput from "../../../../components/MDInput";

const calculateTotalCost = (employees) => {
  return employees.reduce((acc, employee) => {
    return acc + employee.costPerDay;
  }, 0);
};

const filterEmployees = (employees, prompt) => {
  return employees.filter((employee) => {
    const fullName = employee.name + " " + employee.surname;
    return fullName.toLocaleUpperCase().includes(prompt.toLocaleUpperCase());
  });
};

function EmployeesListContent() {
  const isMobile = useMediaQuery("(max-width: 599px)");
  const [employees, setEmployees] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [tableData, setTableData] = useState([]);
  const [employeesUpdated, setEmployeesUpdated] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notification = { add: enqueueSnackbar, close: closeSnackbar };
  const navigate = useNavigate();
  const rows = tableData.map((employee) => {
    return {
      name: (
        <MDBox>
          <MDTypography fontSize="13pt" fontWeight="bold">
            {employee.name + " " + employee.surname}
          </MDTypography>
        </MDBox>
      ),
      cost: <MDTypography>{`${employee.costPerDay} Lek`}</MDTypography>,
      actions: (
        <MDBox style={{ display: "flex" }}>
          <MDButton
            color="success"
            style={{
              marginRight: "5px",
            }}
            onClick={() => {
              navigate(`/app/employees/edit/${employee._id}`);
            }}
          >
            <Icon>edit</Icon>
          </MDButton>
          <ConfirmModal
            confirmAction={() => {
              deleteEmployee(
                notification,
                navigate,
                employee._id,
                setEmployeesUpdated
              );
            }}
          />
        </MDBox>
      ),
    };
  });
  const columns = [
    { Header: "Nome", accessor: "name", align: "left" },
    { Header: "Costo al giorno", accessor: "cost", align: "center" },
    { Header: "Azioni", accessor: "actions", align: "center" },
  ];

  useEffect(() => {
    getEmployees(notification, navigate).then((data) => {
      if (data) {
        setEmployees(data);
        setTableData(data);
      }
    });
    setEmployeesUpdated(false);
  }, [employeesUpdated]);

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
          Operai
        </MDTypography>
        <div
          style={{
            width: isMobile ? "200px" : "355px",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: isMobile ? "column" : "row",
            height: isMobile ? "90px" : "auto",
          }}
        >
          <MDInput
            label="Search"
            color="white"
            value={prompt}
            onChange={(event) => {
              setPrompt(event.target.value);
              setTableData(filterEmployees(employees, event.target.value));
            }}
          />
          <MDButton
            onClick={() => {
              navigate("/app/employees/create");
            }}
          >
            <Icon style={{ marginRight: "5px" }}>person_add</Icon>
            {"Crea nuovo"}
          </MDButton>
        </div>
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
      <TotalMoney value={calculateTotalCost(employees)} />
    </Card>
  );
}

export default EmployeesListContent;
