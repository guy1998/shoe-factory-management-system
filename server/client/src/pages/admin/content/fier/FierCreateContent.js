import React, { useEffect, useState } from "react";
import { Card, Icon } from "@mui/material";
import PropTypes from 'prop-types';
import {
    Unstable_NumberInput as BaseNumberInput,
    numberInputClasses,
  } from "@mui/base/Unstable_NumberInput";
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import DataTable from "../../../../components/Tables/DataTable";
import { useSnackbar } from "notistack";
import MDButton from "../../../../components/MDButton";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { NumericFormat } from "react-number-format";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import { getProducts } from "../products/scripts/product-scripts";
import { createFierStatistic } from "./scripts/fier-scripts";

const CustomNumberInput = React.forwardRef((props, ref) => {
    return (
      <BaseNumberInput
        slots={{
          root: StyledInputRoot,
          input: StyledInputElement,
          incrementButton: StyledButton,
          decrementButton: StyledButton,
        }}
        slotProps={{
          incrementButton: {
            children: "▴",
          },
          decrementButton: {
            children: "▾",
          },
        }}
        {...props}
        ref={ref}
      />
    );
  });
  

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

const calculateEarned = (products) => {
  return products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);
};

const calculateTotalExpenses = (products) => {
    return products.reduce((acc, product) => {
      return acc + product.cost * product.quantity;
    }, 0);
  };

function FierCreateContent() {
  const isMobile = useMediaQuery("(max-width: 599px)");
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [tempCode, setTempCode] = useState("");
  const [productionCost, setProductionCost] = useState(0);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notification = { add: enqueueSnackbar, close: closeSnackbar };
  const navigate = useNavigate();
  const onChangeQuantity = (quantity, code) => {
    const newTableData = selectedProducts.map((product) => {
      if (product.code === code) {
        product.quantity = quantity !== null ? quantity : 1;
      }
      return product;
    });
    setSelectedProducts(newTableData);
  };
  const onChangePrice = (cost, code) => {
    const newTableData = selectedProducts.map((product) => {
      if (product.code === code) {
        product.cost = cost
      }
      return product;
    });
    setSelectedProducts(newTableData);
  };
  const onRemoveProduct = (code) => {
    const newTableData = selectedProducts.filter(
      (product) => product.code !== code
    );
    setSelectedProducts(newTableData);
  };
  const rows = selectedProducts.map((product) => {
    return {
      code: (
        <MDBox>
          <MDTypography fontSize="13pt" fontWeight="bold">
            {product.code}
          </MDTypography>
        </MDBox>
      ),
      price: <MDTypography>{`${product.price} Lek`}</MDTypography>,
      quantity: (
        <CustomNumberInput
          aria-label="Demo number input"
          min={1}
          value={product.quantity}
          onChange={(event, val) => onChangeQuantity(val, product.code)}
          placeholder="Type a number…"
        />
      ),
      cost: (
        <TextField
          label="Price"
          value={product.cost}
          disabled={false}
          onChange={(event) => {
            onChangePrice(event.target.value, product.code);
          }}
          name="numberformat"
          InputProps={{
            inputComponent: NumericFormatCustom,
          }}
          variant="outlined"
          sx={{ minWidth: "100px" }}
          fullWidth
        />
      ),
      subtotal_earn: (
        <MDTypography>
          {`${(product.price * product.quantity)} Lek`}
        </MDTypography>
      ),
      subtotal_cost: (
        <MDTypography>
          {`${(product.cost * product.quantity)} Lek`}
        </MDTypography>
      ),
      subtotal: (
        <MDTypography>
          {`${(product.price * product.quantity) - (product.cost * product.quantity)} Lek`}
        </MDTypography>
      ),
      remove: (
        <MDButton
          color="primary"
          onClick={() => {
            onRemoveProduct(product.code);
          }}
        >
          <Icon>close</Icon>
        </MDButton>
      ),
    };
  });
  const columns = [
    { Header: "Codice", accessor: "code", align: "left" },
    { Header: "Prezo", accessor: "price", align: "center" },
    { Header: "Quantità", accessor: "quantity", align: "center" },
    { Header: "Costo", accessor: "cost", align: "center" },
    { Header: 'Subtotale Guadagnato', accessor: 'subtotal_earn', align: 'center'},
    { Header: 'Subtotale Costo', accessor: 'subtotal_cost', align: 'center'},
    { Header: "Subtotale", accessor: "subtotal", align: "center" },
    { Header: "", accessor: "remove", align: "center" },
  ];
  const onSelectProduct = (event) => {
    const code = event.target.value;
    if (code) {
      setTempCode(code);
      const selected = {
        ...products.filter((product) => product.code === code)[0],
        quantity: 1,
      };
      const exists = selectedProducts.filter(
        (product) => product.code === selected.code
      );
      if (exists.length)
        notification.add("Questo prodotto è già selezionato!", {
          variant: "info",
        });
      else {
        const newlySelectedProducts = [...selectedProducts, { code: selected.code, quantity: selected.quantity, price: selected.costPerArticle.$numberDecimal, cost: 1 }];
        setSelectedProducts(newlySelectedProducts);
      }
    } else {
      setTempCode("default");
    }
  };

  useEffect(() => {
    getProducts(notification, navigate).then((data) => {
      if (data) setProducts(data);
    });
  }, []);

  return (
    <MDBox>
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
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <MDTypography variant="h6" color="white">
            Seleziona i prodotti
          </MDTypography>
          <FormControl
            style={{ width: isMobile ? "100%" : "400px", height: "50px" }}
          >
            <InputLabel
              id="demo-simple-select-label"
              style={{ color: "white" }}
            >
              Prodotti
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Products"
              style={{ width: isMobile ? "100%" : "400px", height: "50px" }}
              value={tempCode}
              onChange={onSelectProduct}
            >
              <MenuItem key={"default"} value={""}>
                None
              </MenuItem>
              {products.map((product) => {
                return (
                  <MenuItem key={product.code} value={product.code}>
                    {product.code}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </MDBox>
        <MDBox pt={3}>
          {selectedProducts.length ? (
            <DataTable
              table={{ columns, rows }}
              isSorted={false}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            />
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              Nessun prodotto ancora selezionato
            </div>
          )}
        </MDBox>
      </Card>
      <MDBox
        style={{
          backgroundColor: "white",
          boxShadow:
            "0px 5px 15px rgba(0, 0, 0, 0.2), 0px 1px 15px rgba(0, 0, 0, 0.)",
          marginTop: "10px",
          borderRadius: "10px",
          padding: isMobile ? "0 40px 15px 20px" : "0 40px 0 20px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
        }}
      >
        <MDBox>
          <MDTypography color="black">
            Totale guadagnato: {calculateEarned(selectedProducts)}
          </MDTypography>
          <MDTypography color="black">
            Spesa totale: {calculateTotalExpenses(selectedProducts)}
          </MDTypography>
          <MDTypography color="black">
            Profitto totale:{" "}
            {calculateEarned(selectedProducts) - calculateTotalExpenses(selectedProducts)}
          </MDTypography>
        </MDBox>
        <MDButton
          color="info"
          onClick={() => {
            if (selectedProducts.length) {
              createFierStatistic(notification, navigate, selectedProducts);
            } else {
              notification.add("Seleziona gli articoli per procedere!", {
                variant: "info",
              });
            }
          }}
        >
          <Icon style={{ marginRight: "5px" }}>check</Icon>
          Conferma
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledInputRoot = styled("div")(
  ({ theme }) => `
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 400;
      border-radius: 8px;
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
      background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
      border: 1px solid ${
        theme.palette.mode === "dark" ? grey[700] : grey[200]
      };
      box-shadow: 0px 2px 4px ${
        theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
      };
      display: grid;
      grid-template-columns: 1fr 19px;
      grid-template-rows: 1fr 1fr;
      overflow: hidden;
      column-gap: 8px;
      padding: 4px;
    
      &.${numberInputClasses.focused} {
        border: 2px solid green;
      }
    
      &:hover {
        border-color: green;
      }
    
      // firefox
      &:focus-visible {
        outline: 0;
      }
    `
);

const StyledInputElement = styled("input")(
  ({ theme }) => `
      font-size: 0.875rem;
      font-family: inherit;
      font-weight: 400;
      line-height: 1.5;
      grid-column: 1/2;
      grid-row: 1/3;
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
      background: inherit;
      border: none;
      border-radius: inherit;
      padding: 8px 12px;
      outline: 0;
    `
);

const StyledButton = styled("button")(
  ({ theme }) => `
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      appearance: none;
      padding: 0;
      width: 19px;
      height: 19px;
      font-family: system-ui, sans-serif;
      font-size: 0.875rem;
      line-height: 1;
      box-sizing: border-box;
      background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
      border: 0;
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 120ms;
    
      &:hover {
        background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
        border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
        cursor: pointer;
      }
    
      &.${numberInputClasses.incrementButton} {
        grid-column: 2/3;
        grid-row: 1/2;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        border: 1px solid;
        border-bottom: 0;
        border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
        background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
        color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
    
        &:hover {
          cursor: pointer;
          color: white;
          background: ${theme.palette.mode === "dark" ? blue[600] : "green"};
          border-color: ${theme.palette.mode === "dark" ? blue[400] : "green"};
        }
      }
    
      &.${numberInputClasses.decrementButton} {
        grid-column: 2/3;
        grid-row: 2/3;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        border: 1px solid;
        border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
        background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
        color: ${theme.palette.mode === "dark" ? grey[200] : grey[900]};
      }
    
      &:hover {
        cursor: pointer;
        color: white;
        background: ${theme.palette.mode === "dark" ? blue[600] : "green"};
        border-color: ${theme.palette.mode === "dark" ? blue[400] : "green"};
      }
    
      & .arrow {
        transform: translateY(-1px);
      }
    
      & .arrow {
        transform: translateY(-1px);
      }
    `
);

export default FierCreateContent;
