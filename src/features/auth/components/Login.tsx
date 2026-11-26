"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
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
import { useLoginMutation } from "@/features/auth/auth";
import { setCredentials } from "@/features/auth/slices/authSlices";
import type { NormalizedError } from "@/utils/error/errorType";
import AuthShell from "@/features/auth/components/AuthShell";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage("Lütfen e-posta adresinizi ve şifrenizi giriniz.");
      return;
    }

    try {
      const response = await login({
        email: email.trim(),
        password,
      }).unwrap();

      if (response?.accessToken) {
        dispatch(setCredentials({ accessToken: response.accessToken }));
      }
      router.push("/dashboard");
    } catch (error) {
      const normalizedError = error as NormalizedError;
      setErrorMessage(
        normalizedError?.data?.Message ||
          "Giriş yapılamadı. Lütfen bilgilerinizi kontrol ediniz."
      );
    }
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <AuthShell
      mode="login"
      kicker="ATELIER ÜYE GİRİŞİ"
      title="Hesabınıza Giriş Yapın"
      subtitle="Özel koleksiyon arşivinize, siparişlerinize ve kişisel stil panelinize erişin."
      editorialBadge="SONBAHAR / KIŞ KOLEKSİYONU 2025"
      editorialQuote="“Kelimelere ihtiyaç duymayan kadınlar için karanlığın en asil biçimiyle tasarlandı.”"
      editorialCaptionLeft="LEVHA 01.0 — NOIR ATELIER MONOGRAF"
      editorialCaptionRight="ÖZEL ERİŞİM"
    >
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2.5}>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

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
              onChange={(e) => {
                setEmail(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
            />
          </Box>

          <Box>
            <FormLabel htmlFor="password">Şifre</FormLabel>
            <TextField
              fullWidth
              required
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                        onClick={() => setShowPassword((prev) => !prev)}
                        onMouseDown={handleMouseDownPassword}
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
            sx={{ mt: 0.5 }}
          >
            {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </Button>

          <Typography
            variant="body2"
            align="center"
            sx={{ pt: 1, color: "text.secondary" }}
          >
            Henüz koleksiyoner hesabınız yok mu?{" "}
            <MuiLink
              href="/auth/register"
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
              Kayıt Olun
            </MuiLink>
          </Typography>
        </Stack>
      </Box>
    </AuthShell>
  );
};

export default Login;
