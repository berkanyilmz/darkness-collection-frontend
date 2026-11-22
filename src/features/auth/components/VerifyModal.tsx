"use client";

import AppModal from "@/app/components/shared/AppModal/AppModal";
import type { NormalizedError } from "@/utils/error/errorType";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";

interface VerifyModalProps {
    open: boolean;
    email: string;
    phoneNumber: string;
    onClose: () => void;
    onVerify: () => void;
}

const VerifyModal = ({
    open,
    email,
    phoneNumber,
    onClose,
    onVerify
}: VerifyModalProps) => {
    const [verify, { isLoading }] = useVerifyMutation();
    const [emailCode, setEmailCode] = useState("");
    const [smsCode, setSmsCode] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleClose = () => {
        if (isLoading) return;
        setEmailCode("");
        setSmsCode("");
        setErrorMessage(null);
        onClose();
    }

    const handleVerify = async () => {
        setErrorMessage(null);
        try {
            await verify({ emailCode, smsCode }).unwrap();
            setEmailCode("");
            setSmsCode("");
            onVerify();
        } catch (error) {
            const normalized = error as NormalizedError;
            setErrorMessage(normalized.data?.Message || "Doğrulama başarısız oldu. Lütfen tekrar deneyin.");
        }
    }

    return (
        <AppModal
            open={open}
            title="Hesap Doğrulama"
            onClose={handleClose}
            disableBackdropClick
            actions={
                <>
                    <Button onClick={handleClose} disabled={isLoading}>
                        İptal
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleVerify}
                        disabled={isLoading || !emailCode.trim() || !smsCode.trim()}
                    >
                        {isLoading ? "Doğrulanıyor..." : "Doğrula"}
                    </Button>
                </>
            }
        >
            <Stack spacing={2}>
                <Typography variant="body2" color="textSecondary">
                    <strong>{email}</strong> adresine ve <strong>{phoneNumber}</strong>{" "}
                    numarasına gönderilen doğrulama kodlarını giriniz.
                </Typography>
                {
                    errorMessage && (
                        <Alert severity="error" sx={{ width: "100%" }}>
                            {errorMessage}
                        </Alert>
                    )
                }

                <TextField
                    fullWidth
                    required
                    label="E-posta Doğrulama Kodu"
                    value={emailCode}
                    onChange={(e) => setEmailCode(e.target.value)}
                    slotProps={{ htmlInput: { inputMode: "numeric", maxLength: 6 } }}
                />
                <TextField
                    fullWidth
                    required
                    label="SMS Doğrulama Kodu"
                    value={smsCode}
                    onChange={(e) => setSmsCode(e.target.value)}
                    slotProps={{ htmlInput: { inputMode: "numeric", maxLength: 6 } }}
                />
            </Stack>
        </AppModal>
    );
}

export default VerifyModal;