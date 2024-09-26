import React from "react";
import MDButton from "../MDButton";
import { Icon } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "dayjs/locale/it"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useMediaQuery } from "@mui/material";
import { useMaterialUIController } from "../../context";
import Modal from "@mui/material/Modal";
import dayjs from "dayjs";

dayjs.locale('it')

function FilterModal({ startDate, setStartDate, endDate, setEndDate }) {
    const isMobile = useMediaQuery("(max-width: 599px)");
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleStartDateChange = (newValue) => {
        if (newValue.isAfter(endDate)) {
          setStartDate(endDate);
        } else {
          setStartDate(newValue);
        }
      };
    
      const handleEndDateChange = (newValue) => {
        if (newValue.isBefore(startDate)) {
          setEndDate(startDate);
        } else {
          setEndDate(newValue);
        }
      };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: isMobile ? 300 : 400,
        height: 250,
        bgcolor: darkMode ? "rgba(255, 255, 255, 0.08)" : "background.paper",
        border: "2px solid #000",
        borderRadius: "10px",
        boxShadow: 24,
        p: 4,
    };

    return (
        <div>
            <MDButton onClick={handleOpen} color="light">
                <Icon>filter_alt</Icon>
            </MDButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Filtra per data
                    </Typography>
                    <div
                        style={{
                            justifyContent: "space-between",
                            margin: "15px auto",
                            height: '100%',
                            width: isMobile ? "80%" : "70%",
                        }}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="it">
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '65%' }}>
                                <DatePicker label="Data di inizio" value={startDate} onChange={handleStartDateChange} />
                                <DatePicker
                                    label="Data di fine"
                                    value={endDate}
                                    onChange={handleEndDateChange}
                                />
                            </div>
                        </LocalizationProvider>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default FilterModal;
