"use client";

import { useEffect, useState } from "react";
import AppModal from "@/app/components/shared/AppModal/AppModal";
import type { NormalizedError } from "@/utils/error/errorType";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormLabel from "@mui/material/FormLabel";
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
          <Button variant="outlined" onClick={handleClose} disabled={isBusy}>
            İptal
          </Button>
          <Button
            variant="contained"
            onClick={handleVerify}
            disabled={isSubmitDisabled}
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

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {infoMessage && <Alert severity="info">{infoMessage}</Alert>}

        <Box>
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between", mb: 1 }}
          >
            <FormLabel htmlFor="email-verify-code" sx={{ mb: 0 }}>
              {emailVerified ? "E-Posta Doğrulandı" : "E-Posta Doğrulama Kodu"}
            </FormLabel>
            {emailVerified && (
              <Chip
                label="ONAYLANDI"
                size="small"
                variant="outlined"
                color="secondary"
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
            slotProps={{
              htmlInput: {
                inputMode: "numeric",
                maxLength: 6,
                style: { letterSpacing: "0.35em", fontFamily: "monospace" },
              },
            }}
          />
          {!emailVerified && (
            <Button
              size="small"
              variant="text"
              disabled={isBusy || emailCooldown > 0}
              onClick={() => handleResend("EMAIL_VERIFICATION")}
              sx={{ mt: 0.5, px: 0, fontSize: "0.625rem" }}
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
            <FormLabel htmlFor="sms-verify-code" sx={{ mb: 0 }}>
              {smsVerified ? "SMS Doğrulandı" : "SMS Doğrulama Kodu"}
            </FormLabel>
            {smsVerified && (
              <Chip
                label="ONAYLANDI"
                size="small"
                variant="outlined"
                color="secondary"
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
            slotProps={{
              htmlInput: {
                inputMode: "numeric",
                maxLength: 6,
                style: { letterSpacing: "0.35em", fontFamily: "monospace" },
              },
            }}
          />
          {!smsVerified && (
            <Button
              size="small"
              variant="text"
              disabled={isBusy || smsCooldown > 0}
              onClick={() => handleResend("SMS_VERIFICATION")}
              sx={{ mt: 0.5, px: 0, fontSize: "0.625rem" }}
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
