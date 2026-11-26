"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MuiLink from "@mui/material/Link";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRegisterMutation } from "@/features/auth/auth";
import type { NormalizedError } from "@/utils/error/errorType";
import VerifyModal from "@/features/auth/components/VerifyModal";
import CustomAlert from "@/app/components/shared/Alert/CustomAlert";
import AuthShell from "@/features/auth/components/AuthShell";

const Register = () => {
  const router = useRouter();

  const [register, { isLoading }] = useRegisterMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [registeredInfo, setRegisteredInfo] = useState({
    email: "",
    phoneNumber: "",
  });

  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    phoneNumber?: string;
  }>({});

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    severity: "success" | "error";
    message: string;
  }>({ open: false, severity: "success", message: "" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFieldErrors({});

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !phoneNumber.trim() ||
      !email.trim() ||
      !password
    ) {
      setSnackbar({
        open: true,
        severity: "error",
        message: "Lütfen tüm zorunlu alanları doldurunuz.",
      });
      return;
    }

    try {
      await register({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phoneNumber: phoneNumber.trim(),
        email: email.trim(),
        password,
      }).unwrap();

      setRegisteredInfo({
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
      });
      setVerifyModalOpen(true);
      setSnackbar({
        open: true,
        severity: "success",
        message:
          "Kayıt başarılı! Lütfen doğrulama için e-posta adresinizi kontrol edin.",
      });
    } catch (error) {
      const normalizedError = error as NormalizedError;
      const code = normalizedError?.data?.code;
      const message = normalizedError?.data?.Message || "Kayıt başarısız!";

      if (code === "1002") {
        setFieldErrors({ email: message });
      } else if (code === "1003") {
        setFieldErrors({ phoneNumber: message });
      } else {
        setSnackbar({ open: true, severity: "error", message });
      }
    }
  };

  return (
    <>
      <AuthShell
        mode="register"
        kicker="ATELIER KOLEKSİYONER KAYDI"
        title="Koleksiyona Katılın"
        subtitle="Sınırlı kapsül serilere öncelikli erişim ve kişisel arşiv ayrıcalıkları için üyeliğinizi oluşturun."
        editorialBadge="SINIRLI EDİSYON 01/2025"
        editorialQuote="“Sessiz güç, keskin mimari form ve zamansız bir karanlık zarafet.”"
        editorialCaptionLeft="LEVHA 02.0 — TAM DAMARLI İTALYAN DERİSİ"
        editorialCaptionRight="TOSKANA SERTİFİKALI"
      >
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              <Box>
                <FormLabel htmlFor="firstName">Ad</FormLabel>
                <TextField
                  fullWidth
                  required
                  id="firstName"
                  name="firstName"
                  autoComplete="given-name"
                  placeholder="Adınız"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="lastName">Soyad</FormLabel>
                <TextField
                  fullWidth
                  required
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  placeholder="Soyadınız"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Box>
            </Box>

            <Box>
              <FormLabel htmlFor="phoneNumber">Telefon Numarası</FormLabel>
              <TextField
                fullWidth
                required
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                autoComplete="tel"
                placeholder="+90 5XX XXX XX XX"
                value={phoneNumber}
                error={Boolean(fieldErrors.phoneNumber)}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  if (fieldErrors.phoneNumber) {
                    setFieldErrors((prev) => ({ ...prev, phoneNumber: undefined }));
                  }
                }}
              />
              {fieldErrors.phoneNumber && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {fieldErrors.phoneNumber}
                </Alert>
              )}
            </Box>

            <Box>
              <FormLabel htmlFor="email">E-Posta Adresi</FormLabel>
              <TextField
                fullWidth
                required
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="ornek@darknesscollection.com"
                value={email}
                error={Boolean(fieldErrors.email)}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (fieldErrors.email) {
                    setFieldErrors((prev) => ({ ...prev, email: undefined }));
                  }
                }}
              />
              {fieldErrors.email && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {fieldErrors.email}
                </Alert>
              )}
            </Box>

            <Box>
              <FormLabel htmlFor="password">Şifre</FormLabel>
              <TextField
                fullWidth
                required
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                          onClick={() => setShowPassword((prev) => !prev)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isLoading}
              endIcon={!isLoading ? <ArrowForwardIcon fontSize="small" /> : undefined}
              sx={{ mt: 1 }}
            >
              {isLoading ? "Kayıt Oluşturuluyor..." : "Kayıt Ol"}
            </Button>

            <Typography
              variant="body2"
              align="center"
              sx={{ pt: 1, color: "text.secondary" }}
            >
              Zaten bir hesabınız var mı?{" "}
              <MuiLink
                href="/auth/login"
                underline="none"
                sx={{
                  color: "text.primary",
                  fontWeight: 600,
                  fontSize: "0.6875rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  borderBottom: "1px solid",
                  borderColor: "primary.main",
                  pb: 0.25,
                  ml: 0.5,
                  "&:hover": { color: "error.main" },
                }}
              >
                Giriş Yapın
              </MuiLink>
            </Typography>
          </Stack>
        </Box>
      </AuthShell>

      <CustomAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />

      <VerifyModal
        open={verifyModalOpen}
        email={registeredInfo.email}
        phoneNumber={registeredInfo.phoneNumber}
        onClose={() => setVerifyModalOpen(false)}
        onVerify={() => {
          setVerifyModalOpen(false);
          setSnackbar({
            open: true,
            severity: "success",
            message:
              "Hesabınız başarıyla doğrulandı! Giriş sayfasına yönlendiriliyorsunuz.",
          });
          setTimeout(() => {
            router.push("/auth/login");
          }, 3000);
        }}
      />
    </>
  );
};

export default Register;
