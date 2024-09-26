import React, { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import CircularProgress from "@mui/material/CircularProgress";
import MDBox from "../../../../components/MDBox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useMediaQuery } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import MDButton from "../../../../components/MDButton";
import { useMaterialUIController } from "../../../../context";
import { getEmployeeInfo, editEmployee } from "./scripts/employee-scripts";

const NumericFormatCustom = React.forwardRef((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
      min={0}
      prefix="Lek "
    />
  );
});

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function EmployeesEditContent() {
  const isMobile = useMediaQuery("(max-width: 599px)");
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const navigator = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notification = { add: enqueueSnackbar, close: closeSnackbar };
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [newInfo, setNewInfo] = useState({
    name: "",
    surname: "",
    costPerDay: 0,
  });
  const updateCost = (event) => {
    if (!event.target.value) setNewInfo({ ...newInfo, costPerDay: 0 });
    const newCost = parseFloat(event.target.value);
    if (isNaN(newCost) || newCost < 0) {
    } else {
      setNewInfo({ ...newInfo, costPerDay: newCost });
    }
  };

  useEffect(() => {
    getEmployeeInfo(notification, navigator, id).then((data) => {
      if (data) {
        setEmployee(data);
        setNewInfo(data);
      }
    });
  }, []);

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
        <h3>Modifico operaio</h3>
      </div>
      {employee ? (
        <div style={{ width: "90%", margin: "0 auto" }}>
          <TextField
            id="outlined-basic"
            label="Nome"
            variant="outlined"
            fullWidth
            value={newInfo.name}
            onChange={(event) => {
              setNewInfo({
                ...newInfo,
                name: event.target.value,
              });
            }}
            style={{ margin: "10px 0" }}
          />
          <TextField
            id="outlined-basic"
            label="Cognome"
            variant="outlined"
            fullWidth
            value={newInfo.surname}
            onChange={(event) => {
              setNewInfo({
                ...newInfo,
                surname: event.target.value,
              });
            }}
            style={{ margin: "10px 0" }}
          />
          <TextField
            label="Costo"
            value={newInfo.costPerDay}
            disabled={false}
            onChange={updateCost}
            name="numberformat"
            InputProps={{
              inputComponent: NumericFormatCustom,
            }}
            variant="outlined"
            min="0"
            sx={{ minWidth: "100px" }}
            fullWidth
          />
        </div>
      ) : (
        <div
          style={{
            width: "90%",
            margin: "0 auto",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          <CircularProgress />{" "}
        </div>
      )}
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
            editEmployee(notification, navigator, newInfo, id);
          }}
        >
          <Icon style={{ marginRight: "5px" }}>check</Icon>
          Conferma
        </MDButton>
        <MDButton
          color="primary"
          onClick={() => {
            navigator("/app/employees");
          }}
        >
          <Icon style={{ marginRight: "5px" }}>close</Icon>
          Annulla
        </MDButton>
      </div>
    </MDBox>
  );
}

export default EmployeesEditContent;
