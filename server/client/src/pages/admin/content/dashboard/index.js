import React from "react";
import ContentModel from "../../../content_model.js";
import BarChart from "./components/BarChart.js";
import { Grid } from "@mui/material";
import MDBox from "../../../../components/MDBox/index.js";
import StastisticsCard from "./components/StatisticsCard.js";
import {
  getMonthlyCost,
  getMonthlyProfit,
  getFierMonthlyProfit,
} from "./scripts/stats-scripts.js";

function DashboardContent() {
  return (
    <ContentModel>
      <MDBox py={3}>
        <Grid container justifyContent="center" spacing={6}>
          <Grid item xs={12} md={6} lg={4}>
            <StastisticsCard
              color="success"
              icon="attach_money"
              title="Monthly profit"
              request={getMonthlyProfit}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <StastisticsCard
              color="info"
              icon="inventory"
              title="Monthly profit 'Fier'"
              request={getFierMonthlyProfit}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <StastisticsCard
              color="primary"
              icon="money_off"
              title="Monthly cost"
              request={getMonthlyCost}
            />
          </Grid>
        </Grid>
        <BarChart />
      </MDBox>
    </ContentModel>
  );
}

export default DashboardContent;
