"use client";

import AppModal from "@/app/components/shared/AppModal/AppModal";
import type { NormalizedError } from "@/utils/error/errorType";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { useResendCodeMutation, useVerifyMutation } from "@/features/auth/auth";
import type { VerificationType } from "@/features/auth/types/authTypes";
import { Box } from "@mui/material";

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
    const [verify, { isLoading: isVerifying }] = useVerifyMutation();
    const [resendCode, { isLoading: isResending }] = useResendCodeMutation();

    const [emailCode, setEmailCode] = useState("");
    const [smsCode, setSmsCode] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);
    const [smsVerified, setSmsVerified] = useState(false);

    const [emailCooldown, setEmailCooldown] = useState(0);
    const [smsCooldown, setSmsCooldown] = useState(0);

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [infoMessage, setInfoMessage] = useState<string | null>(null);

    const isBusy = isVerifying || isResending;

    useEffect(() => {
        if (open) {
            setEmailCooldown(60);
            setSmsCooldown(60);
        }
    }, [open]);

    useEffect(() => {
        if (emailCooldown <= 0) return;
        const timer = setInterval(() => {
            setEmailCooldown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [emailCooldown]);

    useEffect(() => {
        if (smsCooldown <= 0) return;
        const timer = setInterval(() => {
            setSmsCooldown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [smsCooldown]);


    const resetState = () => {
        setEmailCode("");
        setSmsCode("");
        setEmailVerified(false);
        setSmsVerified(false);
        setEmailCooldown(0);
        setSmsCooldown(0);
        setErrorMessage(null);
        setInfoMessage(null);
    };

    const handleClose = () => {
        if (isBusy) return;
        resetState();
        onClose();
    }

    const handleVerify = async () => {
        setErrorMessage(null);
        setInfoMessage(null);

        let isEmailOk = emailVerified;
        let isSmsOk = smsVerified;

        if (!isEmailOk) {
            try {
                await verify({
                    email,
                    verificationType: "EMAIL_VERIFICATION",
                    code: emailCode.trim()
                }).unwrap();
                isEmailOk = true;
                setEmailVerified(true);
            } catch (error) {
                const normalized = error as NormalizedError;
                if (normalized?.data?.code === "1009") {
                    isEmailOk = true;
                    setEmailVerified(true);
                } else {
                    setErrorMessage(`E-posta: ${normalized?.data?.Message || "Doğrulama kodu geçersiz."}`);
                    return;
                }
            }
        }
        if (!isSmsOk) {
            try {
                await verify({
                    email,
                    verificationType: "SMS_VERIFICATION",
                    code: smsCode.trim()
                }).unwrap();
                isSmsOk = true;
                setSmsVerified(true);
            } catch (error) {
                const normalized = error as NormalizedError;
                if (normalized?.data?.code === "1009") {
                    isSmsOk = true;
                    setSmsVerified(true);
                } else {
                    setErrorMessage(`SMS: ${normalized.data?.Message || "Doğrulama kodu geçersiz."}`);
                    return;
                }
            }
        }

        if (isEmailOk && isSmsOk) {
            resetState();
            onVerify();
        }
    };

    const handleResend = async (verificationType: VerificationType) => {
        setErrorMessage(null);
        setInfoMessage(null);

        try {
            await resendCode({ email, verificationType }).unwrap();
            if (verificationType === "EMAIL_VERIFICATION") {
                setEmailCooldown(60);
                setInfoMessage("E-posta doğrulama kodu yeniden gönderildi.");
            } else {
                setSmsCooldown(60);
                setInfoMessage("SMS doğrulama kodu yeniden gönderildi.");
            }
        } catch (error) {
            const normalized = error as NormalizedError;
            setErrorMessage(normalized?.data?.Message || "Doğrulama kodu gönderilemedi. Lütfen tekrar deneyin.");
        }
    };

    const isSubmitDisabled = isBusy ||
        (!emailVerified && emailCode.trim().length !== 6) ||
        (!smsVerified && smsCode.trim().length !== 6);

    return (
        <AppModal
            open={open}
            title="Hesap Doğrulama"
            onClose={handleClose}
            disableBackdropClick
            actions={
                <>
                    <Button onClick={handleClose} disabled={isBusy}>
                        İptal
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleVerify}
                        disabled={isSubmitDisabled}
                    >
                        {isVerifying ? "Doğrulanıyor..." : "Doğrula"}
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

                {
                    infoMessage && (
                        <Alert severity="info" sx={{ width: "100%" }}>
                            {infoMessage}
                        </Alert>
                    )
                }
                <Box>
                    <TextField
                        fullWidth
                        required
                        label={emailVerified
                            ? "E-posta Doğrulandı"
                            : "E-posta Doğrulama Kodu"
                        }
                        value={emailCode}
                        disabled={emailVerified || isBusy}
                        color={emailVerified ? "success" : "primary"}
                        onChange={(e) => setEmailCode(e.target.value)}
                        slotProps={{ htmlInput: { inputMode: "numeric", maxLength: 6 } }}
                    />
                    {!emailVerified && (
                        <Button
                            size="small"
                            disabled={isBusy || emailCooldown > 0}
                            onClick={() => handleResend("EMAIL_VERIFICATION")}
                            sx={{ mt: 0.5 }}
                        >
                            {emailCooldown > 0
                                ? `E-possta kodunu yeniden gönder (${emailCooldown} sn)`
                                : "E-posta kodunu yeniden gönder"}
                        </Button>
                    )}
                </Box>
                <Box>
                    <TextField
                        fullWidth
                        required
                        label={smsVerified
                            ? "SMS Doğrulandı"
                            : "SMS Doğrulama Kodu"
                        }
                        value={smsCode}
                        disabled={smsVerified || isBusy}
                        color={smsVerified ? "success" : "primary"}
                        onChange={(e) => setSmsCode(e.target.value)}
                        slotProps={{ htmlInput: { inputMode: "numeric", maxLength: 6 } }}
                    />
                    {!smsVerified && (
                        <Button
                            size="small"
                            disabled={isBusy || smsCooldown > 0}
                            onClick={() => handleResend("SMS_VERIFICATION")}
                            sx={{ mt: 0.5 }}
                        >
                            {smsCooldown > 0
                                ? `SMS kodunu yeniden gönder (${smsCooldown} sn)`
                                : "SMS kodunu yeniden gönder"}
                        </Button>
                    )}
                </Box>
            </Stack>
        </AppModal>
    );
}

export default VerifyModal;