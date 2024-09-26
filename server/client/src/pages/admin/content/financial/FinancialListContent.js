import React, { useEffect, useState } from "react";
import { Card, Icon, useMediaQuery } from "@mui/material";
import dayjs from "dayjs";
import FilterModal from "../../../../components/DatePickerFilter";
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import DataTable from "../../../../components/Tables/DataTable";
import { useSnackbar } from "notistack";
import MDButton from "../../../../components/MDButton";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./components/ConfirmModal";
import ViewProductsModal from "./components/ViewProductsModal";
import {
  getAllFinancials,
  deleteStat,
  getAllExpenses,
} from "./scripts/financial-scripts";
import TotalMoney from "./components/TotalMoney";

const checkIfToday = (stats) => {
  const now = new Date();
  const firstDay = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
  );
  const today = firstDay.toISOString().split("T")[0];
  return stats.some((stat) => {
    return stat.date.slice(0, 10) === today;
  });
};

const sortByDate = (stats) => {
  stats.sort(
    (a, b) => new Date(b.date.slice(0, 10)) - new Date(a.date.slice(0, 10))
  );
  return stats;
};

const calculateTotal = (stats, expenses) => {
  const profit = stats.reduce((acc, stat) => {
    return parseFloat(acc) + parseFloat(stat.profit.$numberDecimal);
  }, 0);
  return parseFloat(profit) - parseFloat(expenses);
};

function FinancialListContent() {
  const isMobile = useMediaQuery("(max-width: 599px)");
  const [stats, setStats] = useState([]);
  const [expenses, setExpenses] = useState(0);
  const [statsUpdated, setStatsUpdated] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [startDate, setStartDate] = useState(dayjs().startOf("month"));
  const [endDate, setEndDate] = useState(dayjs());
  const notification = { add: enqueueSnackbar, close: closeSnackbar };
  const navigate = useNavigate();
  const rows = stats.map((stat) => {
    return {
      date: (
        <MDBox>
          <MDTypography fontSize="13pt" fontWeight="bold">
            {stat.date.slice(0, 10)}
          </MDTypography>
        </MDBox>
      ),
      profit: (
        <MDTypography>{`${stat.profit.$numberDecimal} Lek`}</MDTypography>
      ),
      cost: (
        <MDTypography>
          {`${stat.productionCost.$numberDecimal} Lek`}
        </MDTypography>
      ),
      actions: (
        <MDBox style={{ display: "flex" }}>
          <ViewProductsModal products={stat.products} />
          <MDButton
            color="success"
            style={{ marginRight: "5px" }}
            onClick={() => {
              navigate("/app/financial/edit/" + stat._id);
            }}
          >
            <Icon>edit</Icon>
          </MDButton>
          <ConfirmModal
            confirmAction={() => {
              deleteStat(notification, navigate, stat._id, setStatsUpdated);
            }}
          />
        </MDBox>
      ),
    };
  });
  const columns = [
    { Header: "Data della relazione", accessor: "date", align: "left" },
    { Header: "Profitto", accessor: "profit", align: "center" },
    { Header: "Costo di produzione", accessor: "cost", align: "center" },
    { Header: "Azioni", accessor: "actions", align: "center" },
  ];

  useEffect(() => {
    getAllFinancials(notification, navigate, startDate, endDate).then(
      (data) => {
        if (data) setStats(sortByDate(data));
      }
    );
    getAllExpenses(notification, navigate, startDate, endDate).then(
      (amount) => {
        if (amount) setExpenses(amount);
      }
    );
    setStatsUpdated(false);
  }, [statsUpdated, startDate, endDate]);

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
          Relazioni finanziarie
        </MDTypography>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: isMobile ? "65px" : "220px",
            height: isMobile ? "90px" : "auto",
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <MDButton
            onClick={() => {
              if (checkIfToday(stats)) {
                notification.add("Oggi è già stato pubblicato un rapporto!", {
                  variant: "info",
                });
              } else {
                navigate("/app/financial/create");
              }
            }}
          >
            <Icon style={{ marginRight: "5px" }}>analytics</Icon>
            {isMobile ? "" : "Crea nuovo"}
          </MDButton>
          <FilterModal
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
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
        <TotalMoney
          value={
           calculateTotal(stats, expenses)
          }
        />
      </MDBox>
    </Card>
  );
}

export default FinancialListContent;
