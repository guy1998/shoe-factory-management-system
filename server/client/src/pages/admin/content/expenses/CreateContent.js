import React, { useState } from "react";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import { Icon } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useSnackbar } from "notistack";
import MDBox from "../../../../components/MDBox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useMediaQuery } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/it";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useMaterialUIController } from "../../../../context";
import MDButton from "../../../../components/MDButton";
import { createAdditionalCost } from "./scripts/expenses-scripts";

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

function CreateContent() {
  const isMobile = useMediaQuery("(max-width: 599px)");
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const navigator = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notification = { add: enqueueSnackbar, close: closeSnackbar };
  const [cost, setCost] = useState(0);
  const [name, setName] = useState("");
  const [date, setDate] = useState(dayjs());
  const [isMonthly, setIsMonthly] = useState(false);

  const updateCost = (event) => {
    if (!event.target.value) setCost(0);
    const newCost = parseFloat(event.target.value);
    if (isNaN(newCost) || newCost < 0) {
    } else {
      setCost(newCost);
    }
  };

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
        <h3>Crea una nuova spesa</h3>
      </div>
      <div style={{ width: "90%", margin: "0 auto" }}>
        <TextField
          id="outlined-basic"
          label="Nome della spesa"
          variant="outlined"
          fullWidth
          style={{ margin: "10px 0" }}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          label="Quantita"
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
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                value={isMonthly}
                onChange={() => setIsMonthly(!isMonthly)}
              />
            }
            label="Seleziona questa casella se si tratta di una spesa mensile."
          />
        </FormGroup>
        {!isMonthly && (
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
            <DemoContainer components={["DateCalendar"]}>
              <DemoItem label="La data della spesa">
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
            createAdditionalCost(notification, navigator, {
              name: name,
              quantity: cost,
              date: date,
              isMonthly,
            });
          }}
        >
          <Icon style={{ marginRight: "5px" }}>check</Icon>
          Conferma
        </MDButton>
        <MDButton
          color="primary"
          onClick={() => {
            navigator("/app/spese");
          }}
        >
          <Icon style={{ marginRight: "5px" }}>close</Icon>
          Annulla
        </MDButton>
      </div>
    </MDBox>
  );
}

export default CreateContent;
