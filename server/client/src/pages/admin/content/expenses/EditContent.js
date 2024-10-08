import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";
import { Icon } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import MDBox from "../../../../components/MDBox";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useMediaQuery } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/it";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { useMaterialUIController } from "../../../../context";
import MDButton from "../../../../components/MDButton";
import { getExpenseById, updateExpense } from "./scripts/expenses-scripts";

dayjs.locale("it");

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

function EditContent() {
  const isMobile = useMediaQuery("(max-width: 599px)");
  const { id } = useParams();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const navigator = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notification = { add: enqueueSnackbar, close: closeSnackbar };
  const [cost, setCost] = useState(0);
  const [name, setName] = useState("");
  const [date, setDate] = useState(dayjs());
  const [isMonthly, setIsMonthly] = useState(true);

  const updateCost = (event) => {
    if (!event.target.value) setCost(0);
    const newCost = parseFloat(event.target.value);
    if (isNaN(newCost) || newCost < 0) {
    } else {
      setCost(newCost);
    }
  };

  useEffect(() => {
    getExpenseById(notification, navigator, id).then((data) => {
      if (data) {
        setCost(data.quantity.$numberDecimal);
        setName(data.name);
        setDate(dayjs(data.date.slice(0, 10)));
        setIsMonthly(data.isMonthly);
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
        <h3>Create a new expense</h3>
      </div>
      <div style={{ width: "90%", margin: "0 auto" }}>
        <TextField
          id="outlined-basic"
          label="Name of the expense"
          variant="outlined"
          fullWidth
          style={{ margin: "10px 0" }}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          label="Quantity"
          value={cost}
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
        {!isMonthly && (
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
            <DemoContainer components={["DateCalendar"]}>
              <DemoItem label="The date of the expense">
                <DateCalendar
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        )}
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
            updateExpense(notification, navigator, id, {
              name: name,
              quantity: cost,
              date: date,
            });
          }}
        >
          <Icon style={{ marginRight: "5px" }}>check</Icon>
          Conferm
        </MDButton>
        <MDButton
          color="primary"
          onClick={() => {
            navigator("/app/spese");
          }}
        >
          <Icon style={{ marginRight: "5px" }}>close</Icon>
          Cancel
        </MDButton>
      </div>
    </MDBox>
  );
}

export default EditContent;
