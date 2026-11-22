"use client";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { DialogActions, DialogContent } from "@mui/material";


export interface AppModalProps {
    open: boolean;
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    actions?: React.ReactNode;
    maxWidth?: DialogProps["maxWidth"];
    disableBackdropClick?: boolean;
    showCloseButton?: boolean;
}

const AppModal = ({
    open,
    title,
    onClose,
    children,
    actions,
    maxWidth = "xs",
    disableBackdropClick = false,
    showCloseButton = true,
}: AppModalProps) => {
    const handleClose: DialogProps["onClose"] = (_, reason) => {
        if (disableBackdropClick && reason === "backdropClick") return;
        onClose();
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={maxWidth}
            fullWidth
        >
            <DialogTitle
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    pr: showCloseButton ? 1.5 : 3,
                }}
            >
                {title}
                {showCloseButton && (
                    <IconButton
                        aria-label="Kapat"
                        onClick={onClose}
                        size="small"
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                )}
            </DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
            {actions && <DialogActions sx={{ px: 3, py: 2 }} >{actions}</DialogActions>}
        </Dialog>
    );
}

export default AppModal;