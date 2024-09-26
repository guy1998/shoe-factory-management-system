import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Card, CircularProgress } from "@mui/material";
import MDBox from "../../../../../components/MDBox";
import ComplexStatisticsCard from "../../../../../components/Cards/StatisticsCards/ComplexStatisticsCard";

function StastisticsCard({ color, icon, title, request }) {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notification = { add: enqueueSnackbar, close: closeSnackbar };
  const navigate = useNavigate();

  useEffect(()=>{
    request(notification, navigate).then(data=>{
        if(data)
            setCount(data);
        setLoading(false);
    })
  }, [])

  return (
    <>
      {loading ? (
        <MDBox mb={1.5}>
          <Card mb={1.5}>
            <MDBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="200px"
            >
              <CircularProgress />
            </MDBox>
          </Card>
        </MDBox>
      ) : (
        <MDBox mb={1.5}>
          <ComplexStatisticsCard
            color={color}
            icon={icon}
            title={title}
            count={count}
            percentage={{
              color: "success",
              amount: "+55%",
              label: "than lask week",
            }}
          />
        </MDBox>
      )}
    </>
  );
}

export default StastisticsCard;
