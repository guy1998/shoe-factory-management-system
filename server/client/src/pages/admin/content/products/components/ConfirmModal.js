import React from "react";
import MDButton from "../../../../../components/MDButton";
import { Icon } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/material";
import { useMaterialUIController } from "../../../../../context";
import Modal from "@mui/material/Modal";

function ConfirmModal({ confirmAction }) {
  const isMobile = useMediaQuery("(max-width: 599px)");
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? 300 : 400,
    bgcolor: darkMode ? "rgba(255, 255, 255, 0.08)" : "background.paper",
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <MDButton onClick={handleOpen} color="primary">
        <Icon>delete</Icon>
      </MDButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sei sicuro?
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "15px auto",
              width: isMobile ? "80%" : "56%",
            }}
          >
            <MDButton color="info" onClick={confirmAction}>
              <Icon style={{ marginRight: "5px" }}>check</Icon>
              Si
            </MDButton>
            <MDButton color="primary" onClick={handleClose}>
              <Icon style={{ marginRight: "5px" }}>close</Icon>
              No
            </MDButton>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ConfirmModal;
