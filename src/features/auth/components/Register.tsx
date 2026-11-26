"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
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

const fieldSx = {
  "& .MuiOutlinedInput-root": {
    bgcolor: "#141415",
    borderRadius: 0,
    fontSize: "0.875rem",
    color: "text.primary",
    "& fieldset": {
      borderColor: "#2A1A1E",
      borderBottomColor: "#3D0F18",
    },
    "&:hover fieldset": {
      borderColor: "#3D0F18",
    },
    "&.Mui-focused": {
      bgcolor: "#171717",
    },
    "&.Mui-focused fieldset": {
      borderColor: "primary.main",
      borderWidth: "1px",
    },
    "&.Mui-error": {
      bgcolor: "#1F0B10",
    },
    "&.Mui-error fieldset": {
      borderColor: "primary.main",
    },
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#7A6F72",
    opacity: 1,
  },
};

const labelSx = {
  display: "block",
  fontSize: "0.625rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.22em",
  color: "#D1D1D6",
  mb: 1,
};

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
            {/* Ad & Soyad */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              <Box>
                <Typography component="label" htmlFor="firstName" sx={labelSx}>
                  Ad
                </Typography>
                <TextField
                  fullWidth
                  required
                  id="firstName"
                  name="firstName"
                  autoComplete="given-name"
                  placeholder="Adınız"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  sx={fieldSx}
                />
              </Box>

              <Box>
                <Typography component="label" htmlFor="lastName" sx={labelSx}>
                  Soyad
                </Typography>
                <TextField
                  fullWidth
                  required
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  placeholder="Soyadınız"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  sx={fieldSx}
                />
              </Box>
            </Box>

            {/* Telefon Numarası */}
            <Box>
              <Typography component="label" htmlFor="phoneNumber" sx={labelSx}>
                Telefon Numarası
              </Typography>
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
                sx={fieldSx}
              />
              {fieldErrors.phoneNumber && (
                <Alert
                  severity="error"
                  sx={{
                    mt: 1,
                    py: 0.25,
                    borderLeft: "2px solid",
                    borderColor: "primary.main",
                    bgcolor: "rgba(42, 11, 16, 0.9)",
                    color: "#FFDAD6",
                    borderRadius: 0,
                  }}
                >
                  {fieldErrors.phoneNumber}
                </Alert>
              )}
            </Box>

            {/* E-Posta */}
            <Box>
              <Typography component="label" htmlFor="email" sx={labelSx}>
                E-Posta Adresi
              </Typography>
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
                sx={fieldSx}
              />
              {fieldErrors.email && (
                <Alert
                  severity="error"
                  sx={{
                    mt: 1,
                    py: 0.25,
                    borderLeft: "2px solid",
                    borderColor: "primary.main",
                    bgcolor: "rgba(42, 11, 16, 0.9)",
                    color: "#FFDAD6",
                    borderRadius: 0,
                  }}
                >
                  {fieldErrors.email}
                </Alert>
              )}
            </Box>

            {/* Şifre */}
            <Box>
              <Typography component="label" htmlFor="password" sx={labelSx}>
                Şifre
              </Typography>
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
                sx={fieldSx}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                          onClick={() => setShowPassword((prev) => !prev)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                          sx={{
                            color: "#9E9E9E",
                            borderRadius: 0,
                            "&:hover": {
                              bgcolor: "transparent",
                              color: "text.primary",
                            },
                          }}
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

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isLoading}
              endIcon={!isLoading ? <ArrowForwardIcon sx={{ fontSize: 16 }} /> : undefined}
              sx={{
                height: 52,
                mt: 1,
                borderRadius: 0,
                bgcolor: "primary.main",
                color: "primary.contrastText",
                border: "1px solid rgba(168, 45, 62, 0.4)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.24em",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "primary.dark",
                  boxShadow: "0 0 24px rgba(122, 24, 37, 0.55)",
                },
              }}
            >
              {isLoading ? "KAYIT OLUŞTURULUYOR..." : "KAYIT OL"}
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
                  transition: "color 0.2s ease",
                  "&:hover": {
                    color: "#FF868B",
                  },
                }}
              >
                GİRİŞ YAPIN
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
