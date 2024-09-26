import React, { useState, useEffect } from "react";
import { Card, Icon } from "@mui/material";
import MDBox from "../../../../components/MDBox";
import MDTypography from "../../../../components/MDTypography";
import DataTable from "../../../../components/Tables/DataTable";
import { useSnackbar } from "notistack";
import MDButton from "../../../../components/MDButton";
import { useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./components/ConfirmModal";
import { getProducts, deleteProduct } from "./scripts/product-scripts";

function ProductListContent() {
  const [articles, setArticles] = useState([]);
  const isMobile = useMediaQuery("(max-width: 599px)");
  const [articlesUpdated, setArticlesUpdated] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notification = { add: enqueueSnackbar, close: closeSnackbar };
  const navigate = useNavigate();
  const rows = articles.map((article) => {
    return {
      name: (
        <MDBox>
          <MDTypography fontSize="13pt" fontWeight="bold">
            {article.code}
          </MDTypography>
        </MDBox>
      ),
      cost: (
        <MDTypography>{`${article.costPerArticle.$numberDecimal} Lek`}</MDTypography>
      ),
      actions: (
        <MDBox style={{ display: "flex" }}>
          <MDButton
            color="success"
            style={{
              marginRight: "5px",
            }}
            onClick={() => {
              navigate("/app/products/edit/" + article._id);
            }}
          >
            <Icon>edit</Icon>
          </MDButton>
          <ConfirmModal
            confirmAction={() => {
              deleteProduct(
                notification,
                navigate,
                article._id,
                setArticlesUpdated
              );
            }}
          />
        </MDBox>
      ),
    };
  });
  const columns = [
    { Header: "Codice articolo", accessor: "name", align: "left" },
    { Header: "Costo per articolo", accessor: "cost", align: "center" },
    { Header: "Azioni", accessor: "actions", align: "center" },
  ];

  useEffect(() => {
    getProducts(notification, navigate).then((data) => {
      if (data) setArticles(data);
    });
    setArticlesUpdated(false);
  }, [articlesUpdated]);

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
          Prodotto
        </MDTypography>
        <MDButton
          onClick={() => {
            navigate("/app/products/create");
          }}
        >
          <Icon style={{ marginRight: "5px" }}>category</Icon>
          {isMobile ? "" : "Crea nuovo"}
        </MDButton>
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
  );
}

export default ProductListContent;
