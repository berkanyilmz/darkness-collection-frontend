"use client";

import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export interface CustomAlertProps {
    open: boolean;
    onClose: () => void;
    message: string;
    severity?: "error" | "warning" | "info" | "success";
    autoHideDuration?: number;
}

const CustomAlert = ({
    open,
    onClose,
    message,
    severity = "info",
    autoHideDuration = 5000,
}: CustomAlertProps) => {

    const handleClose = (_?: React.SyntheticEvent | Event | null,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === "clickaway") {
            return;
        }
        onClose();
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={autoHideDuration}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: "100%" }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}

export default CustomAlert;