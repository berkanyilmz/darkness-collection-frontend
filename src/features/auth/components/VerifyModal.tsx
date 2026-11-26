"use client";

import { useEffect, useState } from "react";
import AppModal from "@/app/components/shared/AppModal/AppModal";
import type { NormalizedError } from "@/utils/error/errorType";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { useResendCodeMutation, useVerifyMutation } from "@/features/auth/auth";
import type { VerificationType } from "@/features/auth/types/authTypes";

interface VerifyModalProps {
  open: boolean;
  email: string;
  phoneNumber: string;
  onClose: () => void;
  onVerify: () => void;
}

const codeFieldSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "#141415",
    borderRadius: 0,
    color: "text.primary",
    "& fieldset": {
      borderColor: "#2A1A1E",
      borderBottomColor: "#3D0F18",
    },
    "&:hover fieldset": {
      borderColor: "#3D0F18",
    },
    "&.Mui-focused fieldset": {
      borderColor: "primary.main",
      borderWidth: "1px",
    },
  },
  "& .MuiInputBase-input": {
    letterSpacing: "0.35em",
    fontFamily: "monospace",
  },
};

const VerifyModal = ({
  open,
  email,
  phoneNumber,
  onClose,
  onVerify,
}: VerifyModalProps) => {
  const [verify, { isLoading: isVerifying }] = useVerifyMutation();
  const [resendCode, { isLoading: isResending }] = useResendCodeMutation();

  const [emailCode, setEmailCode] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [smsVerified, setSmsVerified] = useState(false);

  const [emailCooldown, setEmailCooldown] = useState(60);
  const [smsCooldown, setSmsCooldown] = useState(60);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const isBusy = isVerifying || isResending;

  useEffect(() => {
    if (!open || emailCooldown <= 0) return;
    const timer = setInterval(() => {
      setEmailCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [open, emailCooldown]);

  useEffect(() => {
    if (!open || smsCooldown <= 0) return;
    const timer = setInterval(() => {
      setSmsCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [open, smsCooldown]);

  const resetState = () => {
    setEmailCode("");
    setSmsCode("");
    setEmailVerified(false);
    setSmsVerified(false);
    setEmailCooldown(60);
    setSmsCooldown(60);
    setErrorMessage(null);
    setInfoMessage(null);
  };

  const handleClose = () => {
    if (isBusy) return;
    resetState();
    onClose();
  };

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
          code: emailCode.trim(),
        }).unwrap();
        isEmailOk = true;
        setEmailVerified(true);
      } catch (error) {
        const normalized = error as NormalizedError;
        if (normalized?.data?.code === "1009") {
          isEmailOk = true;
          setEmailVerified(true);
        } else {
          setErrorMessage(
            `E-posta: ${normalized?.data?.Message || "Doğrulama kodu geçersiz."}`
          );
          return;
        }
      }
    }

    if (!isSmsOk) {
      try {
        await verify({
          email,
          verificationType: "SMS_VERIFICATION",
          code: smsCode.trim(),
        }).unwrap();
        isSmsOk = true;
        setSmsVerified(true);
      } catch (error) {
        const normalized = error as NormalizedError;
        if (normalized?.data?.code === "1009") {
          isSmsOk = true;
          setSmsVerified(true);
        } else {
          setErrorMessage(
            `SMS: ${normalized?.data?.Message || "Doğrulama kodu geçersiz."}`
          );
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
      setErrorMessage(
        normalized?.data?.Message ||
          "Doğrulama kodu gönderilemedi. Lütfen tekrar deneyin."
      );
    }
  };

  const isSubmitDisabled =
    isBusy ||
    (!emailVerified && emailCode.trim().length !== 6) ||
    (!smsVerified && smsCode.trim().length !== 6);

  return (
    <AppModal
      open={open}
      title="Hesap Doğrulama"
      onClose={handleClose}
      disableBackdropClick
      actions={
        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            onClick={handleClose}
            disabled={isBusy}
            sx={{
              borderRadius: 0,
              borderColor: "divider",
              color: "text.secondary",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              fontSize: "0.6875rem",
              px: 3,
              "&:hover": {
                borderColor: "primary.main",
                bgcolor: "transparent",
                color: "text.primary",
              },
            }}
          >
            İptal
          </Button>
          <Button
            variant="contained"
            onClick={handleVerify}
            disabled={isSubmitDisabled}
            sx={{
              borderRadius: 0,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              fontSize: "0.6875rem",
              px: 3.5,
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            {isVerifying ? "Doğrulanıyor..." : "Doğrula"}
          </Button>
        </Stack>
      }
    >
      <Stack spacing={2.5} sx={{ py: 0.5 }}>
        <Typography variant="body2" color="text.secondary">
          <Box component="strong" sx={{ color: "text.primary", fontWeight: 500 }}>
            {email}
          </Box>{" "}
          adresine ve{" "}
          <Box component="strong" sx={{ color: "text.primary", fontWeight: 500 }}>
            {phoneNumber}
          </Box>{" "}
          numarasına gönderilen 6 haneli doğrulama kodlarını giriniz.
        </Typography>

        {errorMessage && (
          <Alert
            severity="error"
            sx={{
              width: "100%",
              borderRadius: 0,
              border: "1px solid",
              borderColor: "primary.main",
              bgcolor: "rgba(42, 11, 16, 0.9)",
              color: "#FFDAD6",
            }}
          >
            {errorMessage}
          </Alert>
        )}

        {infoMessage && (
          <Alert
            severity="info"
            sx={{
              width: "100%",
              borderRadius: 0,
              border: "1px solid",
              borderColor: "secondary.main",
              bgcolor: "#171717",
              color: "#E5D0D3",
            }}
          >
            {infoMessage}
          </Alert>
        )}

        <Box>
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between", mb: 1 }}
          >
            <Typography
              component="label"
              htmlFor="email-verify-code"
              sx={{
                fontSize: "0.625rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "#D1D1D6",
              }}
            >
              {emailVerified ? "E-Posta Doğrulandı" : "E-Posta Doğrulama Kodu"}
            </Typography>
            {emailVerified && (
              <Chip
                label="ONAYLANDI"
                size="small"
                sx={{
                  height: 20,
                  borderRadius: 0,
                  fontSize: "0.5625rem",
                  letterSpacing: "0.18em",
                  bgcolor: "rgba(61, 15, 24, 0.45)",
                  color: "#FF868B",
                  border: "1px solid",
                  borderColor: "secondary.main",
                }}
              />
            )}
          </Stack>
          <TextField
            id="email-verify-code"
            fullWidth
            required
            placeholder="000000"
            value={emailCode}
            disabled={emailVerified || isBusy}
            color={emailVerified ? "success" : "primary"}
            onChange={(e) => setEmailCode(e.target.value)}
            slotProps={{ htmlInput: { inputMode: "numeric", maxLength: 6 } }}
            sx={codeFieldSx}
          />
          {!emailVerified && (
            <Button
              size="small"
              variant="text"
              disabled={isBusy || emailCooldown > 0}
              onClick={() => handleResend("EMAIL_VERIFICATION")}
              sx={{
                mt: 0.75,
                px: 0,
                bgcolor: "transparent !important",
                color: "text.secondary",
                fontSize: "0.625rem",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                "&:hover": {
                  bgcolor: "transparent !important",
                  color: "#FF868B",
                },
              }}
            >
              {emailCooldown > 0
                ? `E-posta kodunu yeniden gönder (${emailCooldown} sn)`
                : "E-posta kodunu yeniden gönder"}
            </Button>
          )}
        </Box>

        <Box>
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between", mb: 1 }}
          >
            <Typography
              component="label"
              htmlFor="sms-verify-code"
              sx={{
                fontSize: "0.625rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "#D1D1D6",
              }}
            >
              {smsVerified ? "SMS Doğrulandı" : "SMS Doğrulama Kodu"}
            </Typography>
            {smsVerified && (
              <Chip
                label="ONAYLANDI"
                size="small"
                sx={{
                  height: 20,
                  borderRadius: 0,
                  fontSize: "0.5625rem",
                  letterSpacing: "0.18em",
                  bgcolor: "rgba(61, 15, 24, 0.45)",
                  color: "#FF868B",
                  border: "1px solid",
                  borderColor: "secondary.main",
                }}
              />
            )}
          </Stack>
          <TextField
            id="sms-verify-code"
            fullWidth
            required
            placeholder="000000"
            value={smsCode}
            disabled={smsVerified || isBusy}
            color={smsVerified ? "success" : "primary"}
            onChange={(e) => setSmsCode(e.target.value)}
            slotProps={{ htmlInput: { inputMode: "numeric", maxLength: 6 } }}
            sx={codeFieldSx}
          />
          {!smsVerified && (
            <Button
              size="small"
              variant="text"
              disabled={isBusy || smsCooldown > 0}
              onClick={() => handleResend("SMS_VERIFICATION")}
              sx={{
                mt: 0.75,
                px: 0,
                bgcolor: "transparent !important",
                color: "text.secondary",
                fontSize: "0.625rem",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                "&:hover": {
                  bgcolor: "transparent !important",
                  color: "#FF868B",
                },
              }}
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
};

export default VerifyModal;
