import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from 'prop-types';
import { Icon } from "@mui/material";
import TextField from "@mui/material/TextField";
import MDBox from "../../../../components/MDBox";
import { NumericFormat } from "react-number-format";
import { useMediaQuery } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useMaterialUIController } from "../../../../context";
import MDButton from "../../../../components/MDButton";
import { useSnackbar } from "notistack";
import { editProduct, getProductInfo } from "./scripts/product-scripts";

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


function ProductEditContent() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const isMobile = useMediaQuery("(max-width: 599px)");
  const navigator = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notification = { add: enqueueSnackbar, close: closeSnackbar };
  const [product, setProduct] = useState(null);
  const [cost, setCost] = useState(0);
  const [code, setCode] = useState("");
  const { id } = useParams();

  const updateCost = (event) => {
    if (!event.target.value) setCost(0);
    const newCost = parseFloat(event.target.value);
    if (isNaN(newCost) || newCost < 0) {
    } else {
      setCost(newCost);
    }
  };

  useEffect(() => {
    getProductInfo(notification, navigator, id).then((data) => {
      if (data) {
        setProduct(data);
        setCode(data.code);
        setCost(data.costPerArticle.$numberDecimal);
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
        <h3>Modifica prodotto</h3>
      </div>
      {product ? (
        <div style={{ width: "90%", margin: "0 auto" }}>
          <TextField
            id="outlined-basic"
            label="Codice prodotto"
            variant="outlined"
            fullWidth
            style={{ margin: "10px 0" }}
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
          <TextField
          label="Costo"
          value={cost}
          disabled={false}
          onChange={updateCost}
          name="numberformat"
          InputProps={{
            inputComponent: NumericFormatCustom,
          }}
          variant="outlined"
          min='0'
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
            editProduct(notification, navigator, product._id, {
              code,
              costPerArticle: cost,
            });
          }}
        >
          <Icon style={{ marginRight: "5px" }}>check</Icon>
          Conferma
        </MDButton>
        <MDButton
          color="primary"
          onClick={() => {
            navigator("/app/products");
          }}
        >
          <Icon style={{ marginRight: "5px" }}>close</Icon>
          Annulla
        </MDButton>
      </div>
    </MDBox>
  );
}

export default ProductEditContent;
