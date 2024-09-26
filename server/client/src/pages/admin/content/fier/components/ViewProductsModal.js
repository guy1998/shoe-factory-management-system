import React, { useState } from "react";
import { Card, Icon } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import MDBox from "../../../../../components/MDBox";
import MDTypography from "../../../../../components/MDTypography";
import DataTable from "../../../../../components/Tables/DataTable";
import MDButton from "../../../../../components/MDButton";
import { useMediaQuery } from "@mui/material";
import { useMaterialUIController } from "../../../../../context";

function ViewProductsModal({ products }) {
  const isMobile = useMediaQuery("(max-width: 599px)");
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "90%" : 800,
    height: 400,
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    overflow: "scroll",
  };

  const rows = products.map((product) => {
    return {
      code: (
        <MDBox>
          <MDTypography fontSize="13pt" fontWeight="bold">
            {product.code}
          </MDTypography>
        </MDBox>
      ),
      quantity: <MDTypography>{`${product.quantity}`}</MDTypography>,
      price: (
        <MDTypography>{`${product.price.$numberDecimal} Lek`}</MDTypography>
      ),
      cost: (
        <MDTypography>{`${product.cost.$numberDecimal} Lek`}</MDTypography>
      ),
    };
  });
  const columns = [
    { Header: "Codice", accessor: "code", align: "left" },
    { Header: "Quantità", accessor: "quantity", align: "center" },
    { Header: "Prezzo dell'articolo", accessor: "price", align: "center" },
    { Header: "Costo dell'articolo", accessor: 'cost', align: 'center'}
  ];

  return (
    <div>
      <MDButton
        color={darkMode ? "dark" : "light"}
        style={{ marginRight: "5px" }}
        onClick={handleOpen}
      >
        <Icon style={{ marginRight: "5px" }}>manage_search</Icon>
        Visualizza i articoli{" "}
      </MDButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                Articoli
              </MDTypography>
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
          </Card>
        </Box>
      </Modal>
    </div>
  );
}

export default ViewProductsModal;
