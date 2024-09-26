import React, { useState, useEffect } from "react";
import { Card, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import MDBox from "../../../../../components/MDBox";
import ReportsBarChart from "../../../../../components/Charts/BarCharts/ReportsBarChart/index";
import HorizontalBarChart from "../../../../../components/Charts/BarCharts/HorizontalBarChart";
import { getWeeklyStats } from "../scripts/stats-scripts";
import { format, subDays } from "date-fns";
import { useMediaQuery } from "@mui/material";

const getLabels = () => {
  const today = new Date();
  const labels = [];
  for (let i = 6; i >= 0; i--) {
    const temp = subDays(today, i);
    labels.push(format(temp, "yyyy-MM-dd"));
  }
  return labels;
};

const createReportBarChartData = async (notification, navigator, isMobile) => {
  const data = await getWeeklyStats(notification, navigator);
  const labels = getLabels();
  let count = 0;
  const reportDataset = labels.map((label) => {
    if (count < data.length && data[count].date.slice(0, 10) === label) {
      return data[count++].profit.$numberDecimal;
    } else {
      return 0;
    }
  });
  return { labels: labels, datasets: isMobile ? [{ labels: "Dates", data: reportDataset }] : { labels: "Dates", data: reportDataset } };
};

function BarChart() {
  const isMobile = useMediaQuery("(max-width: 599px)");
  const [loading, setLoading] = useState(true);
  const [reportsBarChartData, setReportsBarChartData] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notification = { add: enqueueSnackbar, close: closeSnackbar };
  const navigate = useNavigate();

  useEffect(() => {
    createReportBarChartData(notification, navigate, isMobile).then((data) => {
      setReportsBarChartData(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {!loading ? (
        <MDBox py={3}>
          {!isMobile ? (
            <ReportsBarChart
              color="info"
              title="Statistiche sui profitti"
              description="L'andamento di questa settimana (guadagno meno il costo del lavoro)"
              date="aggiornato quotidianamente"
              chart={reportsBarChartData}
            />
          ) : (
            <HorizontalBarChart
              color="info"
              title="Profit statistics"
              description="L'andamento di questa settimana (guadagno meno il costo del lavoro)"
              date="aggiornato quotidianamente"
              chart={reportsBarChartData}
            />
          )}
        </MDBox>
      ) : (
        <MDBox py={3}>
          <Card sx={{ height: "100%" }}>
            <MDBox
              height="20.5rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <CircularProgress />
            </MDBox>
          </Card>
        </MDBox>
      )}
    </>
  );
}

export default BarChart;
