"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MuiLink from "@mui/material/Link";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import { bodoni } from "@/utils/theme/Typography";

export const AUTH_EDITORIAL_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBj48w1EKhIqCFPzVK_xtjsgdfxJBe7KzGEIJs1YW-WfBT57Aa1Y6SeSil2IQUufyjRQml_rE0gb3RPNxsPktl1RRh1oZ28MofRxIy9fV-GIKdRbSA0b98I3rn7T1Sw5JdPHHYxMvATH78x96U4iszIzNq9b34Eqon55K48ee8tJWEvMBqDgzm3aEgzEO0UzRpzWe49-NAM0x9abvagGWJLCicdtczzl5ASavt05aFHzZiwx1tAGDW37A";

export interface AuthShellProps {
  mode: "login" | "register";
  kicker: string;
  title: string;
  subtitle: string;
  editorialBadge: string;
  editorialQuote: string;
  editorialCaptionLeft: string;
  editorialCaptionRight: string;
  children: React.ReactNode;
}

const PILLARS = [
  { title: "MİMARİ FORM", subtitle: "Heykelsi Silüet" },
  { title: "PREMİUM DERİ", subtitle: "İtalyan Nappa" },
  { title: "KAPSÜL SERİ", subtitle: "Numaralı Arşiv" },
];

const AuthShell = ({
  mode,
  kicker,
  title,
  subtitle,
  editorialBadge,
  editorialQuote,
  editorialCaptionLeft,
  editorialCaptionRight,
  children,
}: AuthShellProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        bgcolor: "background.default",
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
        "& ::selection": {
          bgcolor: "primary.main",
          color: "#FFFFFF",
        },
      }}
    >
      {/* Top Announcement Ribbon */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "#120406",
          borderBottom: "1px solid",
          borderColor: "divider",
          py: 1,
          px: { xs: 2.5, md: 8 },
          textAlign: "center",
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: "#E5E5E5",
            fontSize: { xs: "0.5625rem", sm: "0.625rem" },
            letterSpacing: "0.26em",
            display: "block",
          }}
        >
          DARKNESS COLLECTION ATELIER — ÖZEL KOLEKSİYONER ERİŞİMİ &amp; 256-BİT SSL GÜVENCESİ
        </Typography>
      </Box>

      {/* Editorial Header */}
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          width: "100%",
          bgcolor: "rgba(10, 10, 10, 0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(61, 15, 24, 0.8)",
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: 1440,
            mx: "auto",
            height: 80,
            px: { xs: 2.5, md: 8 },
          }}
        >
          <MuiLink
            href="/"
            underline="none"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              "&:hover .brand-dot": { transform: "scale(1.25)" },
              "&:hover .brand-title": { color: "#FF868B" },
            }}
          >
            <Box
              className="brand-dot"
              sx={{
                width: 10,
                height: 10,
                borderRadius: "50% !important",
                bgcolor: "primary.main",
                boxShadow: "0 0 10px #641C2A",
                transition: "transform 0.3s ease",
              }}
            />
            <Typography
              className="brand-title"
              variant="h5"
              component="span"
              sx={{
                fontFamily: bodoni.style.fontFamily,
                fontSize: { xs: "1.125rem", sm: "1.375rem" },
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "text.primary",
                transition: "color 0.25s ease",
              }}
            >
              DARKNESS COLLECTION
            </Typography>
          </MuiLink>

          <Stack
            component="nav"
            aria-label="Kimlik doğrulama menüsü"
            direction="row"
            spacing={{ xs: 2, sm: 3 }}
            sx={{ alignItems: "center" }}
          >
            <MuiLink
              href="/auth/login"
              underline="none"
              aria-current={mode === "login" ? "page" : undefined}
              sx={{
                fontSize: "0.6875rem",
                fontWeight: mode === "login" ? 600 : 500,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                pb: 0.5,
                color: mode === "login" ? "text.primary" : "text.secondary",
                borderBottom: "1px solid",
                borderColor: mode === "login" ? "primary.main" : "transparent",
                transition: "all 0.25s ease",
                "&:hover": {
                  color: "text.primary",
                  borderColor: "primary.main",
                },
              }}
            >
              GİRİŞ YAP
            </MuiLink>
            <Typography
              component="span"
              sx={{ color: "divider", fontWeight: 300, userSelect: "none" }}
            >
              /
            </Typography>
            <MuiLink
              href="/auth/register"
              underline="none"
              aria-current={mode === "register" ? "page" : undefined}
              sx={{
                fontSize: "0.6875rem",
                fontWeight: mode === "register" ? 600 : 500,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                pb: 0.5,
                color: mode === "register" ? "text.primary" : "text.secondary",
                borderBottom: "1px solid",
                borderColor: mode === "register" ? "primary.main" : "transparent",
                transition: "all 0.25s ease",
                "&:hover": {
                  color: "text.primary",
                  borderColor: "primary.main",
                },
              }}
            >
              KAYIT OL
            </MuiLink>
          </Stack>
        </Stack>
      </Box>

      {/* Main Split Architectural Grid */}
      <Box
        component="main"
        sx={{
          flex: 1,
          width: "100%",
          maxWidth: 1440,
          mx: "auto",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "repeat(12, 1fr)" },
        }}
      >
        {/* Left Editorial Visual Panel */}
        <Box
          component="section"
          aria-label="Darkness Collection Editoryal"
          sx={{
            display: { xs: "none", lg: "flex" },
            gridColumn: { lg: "span 6" },
            position: "relative",
            borderRight: "1px solid rgba(61, 15, 24, 0.8)",
            bgcolor: "#0D0D0E",
            backgroundImage:
              "radial-gradient(circle at 28% 68%, rgba(61, 15, 24, 0.45), #0A0A0A 72%)",
            overflow: "hidden",
            flexDirection: "column",
            justifyContent: "space-between",
            p: { lg: 6, xl: 8 },
          }}
        >
          {!imageError && (
            <Box
              component="img"
              src={AUTH_EDITORIAL_IMAGE}
              alt="Darkness Collection Istanbul Twilight Editorial"
              onError={() => setImageError(true)}
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                opacity: 0.65,
                filter: "brightness(0.9) contrast(1.05)",
              }}
            />
          )}

          {/* Editorial Scrim Overlays */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, #0A0A0A 0%, rgba(10,10,10,0.6) 50%, rgba(10,10,10,0.35) 100%)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.35) 55%, transparent 100%)",
            }}
          />

          {/* Top Seal Badge */}
          <Stack
            direction="row"
            spacing={1.25}
            sx={{
              alignItems: "center",
              position: "relative",
              zIndex: 1,
              bgcolor: "rgba(10, 10, 10, 0.9)",
              backdropFilter: "blur(8px)",
              px: 1.75,
              py: 0.75,
              border: "1px solid",
              borderColor: "divider",
              width: "fit-content",
            }}
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50% !important",
                bgcolor: "primary.main",
                boxShadow: "0 0 6px #7A1825",
              }}
            />
            <Typography
              variant="overline"
              sx={{ color: "#E5D0D3", letterSpacing: "0.26em" }}
            >
              {editorialBadge}
            </Typography>
          </Stack>

          {/* Bottom Editorial Composition */}
          <Stack spacing={3} sx={{ position: "relative", zIndex: 1, mt: "auto", pt: 8 }}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
              <Box sx={{ width: 32, height: "1px", bgcolor: "primary.main" }} />
              <Typography
                variant="overline"
                sx={{ color: "#FF868B", letterSpacing: "0.28em" }}
              >
                DARKNESS ATELIER — KALICI MONOGRAF
              </Typography>
            </Stack>

            <Typography
              variant="h1"
              component="h2"
              sx={{
                fontFamily: bodoni.style.fontFamily,
                fontSize: { lg: "2.75rem", xl: "3.375rem" },
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                lineHeight: 1.02,
                color: "text.primary",
              }}
            >
              DARKNESS
              <Box
                component="span"
                sx={{ display: "block", fontStyle: "italic", fontWeight: 400 }}
              >
                COLLECTION
              </Box>
            </Typography>

            <Typography
              component="blockquote"
              sx={{
                m: 0,
                pl: 2,
                borderLeft: "2px solid",
                borderColor: "primary.main",
                fontFamily: bodoni.style.fontFamily,
                fontStyle: "italic",
                fontSize: { lg: "1.25rem", xl: "1.375rem" },
                color: "#E5D0D3",
                lineHeight: 1.55,
                maxWidth: 480,
              }}
            >
              {editorialQuote}
            </Typography>

            {/* Atelier Pillar Strip */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 1.5,
                pt: 1,
                maxWidth: 480,
              }}
            >
              {PILLARS.map((pillar) => (
                <Box
                  key={pillar.title}
                  sx={{
                    bgcolor: "rgba(20, 20, 21, 0.85)",
                    backdropFilter: "blur(6px)",
                    border: "1px solid #2A1A1E",
                    p: 1.5,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: bodoni.style.fontFamily,
                      fontSize: "0.875rem",
                      color: "text.primary",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {pillar.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.5625rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                      color: "text.secondary",
                      mt: 0.5,
                    }}
                  >
                    {pillar.subtitle}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Bottom Caption Line */}
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                pt: 2.5,
                borderTop: "1px solid rgba(61, 15, 24, 0.7)",
              }}
            >
              <Typography
                variant="overline"
                sx={{ color: "text.secondary", letterSpacing: "0.22em" }}
              >
                {editorialCaptionLeft}
              </Typography>
              <Typography
                variant="overline"
                sx={{ color: "#E5E5E5", letterSpacing: "0.22em" }}
              >
                {editorialCaptionRight}
              </Typography>
            </Stack>
          </Stack>
        </Box>

        {/* Right Form Panel */}
        <Box
          component="section"
          sx={{
            gridColumn: { xs: "span 1", lg: "span 6" },
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            px: { xs: 2.5, sm: 5, md: 8 },
            py: { xs: 5, lg: 7 },
            overflow: "hidden",
            backgroundImage:
              "radial-gradient(circle at 50% 45%, rgba(61, 15, 24, 0.24), #0A0A0A 68%)",
          }}
        >
          <Paper
            elevation={0}
            sx={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              maxWidth: 468,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              p: { xs: 3.5, sm: 5 },
              borderRadius: 0,
            }}
          >
            {/* Top Signature Burgundy Hairline Accent */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background:
                  "linear-gradient(90deg, #3D0F18 0%, #7A1825 50%, #3D0F18 100%)",
              }}
            />

            {/* Form Header */}
            <Stack spacing={1.25}>
              <Stack direction="row" spacing={1.25} sx={{ alignItems: "center" }}>
                <Box sx={{ width: 24, height: "1px", bgcolor: "primary.main" }} />
                <Typography
                  variant="overline"
                  sx={{ color: "#FF868B", letterSpacing: "0.28em" }}
                >
                  {kicker}
                </Typography>
              </Stack>

              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontFamily: bodoni.style.fontFamily,
                  fontSize: { xs: "1.875rem", sm: "2.125rem" },
                  color: "text.primary",
                  lineHeight: 1.15,
                  letterSpacing: "-0.01em",
                }}
              >
                {title}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "text.secondary", lineHeight: 1.6 }}
              >
                {subtitle}
              </Typography>
            </Stack>

            <Divider sx={{ my: 3, borderColor: "#2A1A1E" }} />

            {children}

            {/* Security Seal Footer */}
            <Box sx={{ mt: 3.5, pt: 3, borderTop: "1px solid #2A1A1E" }}>
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "#0D0D0E",
                  border: "1px solid rgba(61, 15, 24, 0.6)",
                  px: 1.5,
                  py: 1,
                }}
              >
                <ShieldOutlinedIcon sx={{ fontSize: 15, color: "#FF868B" }} />
                <Typography
                  sx={{
                    fontSize: "0.5625rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "#D1D1D6",
                  }}
                >
                  256-BİT SSL KORUMALI GÜVENLİ ATELIER ERİŞİMİ
                </Typography>
              </Stack>
            </Box>
          </Paper>
        </Box>
      </Box>

      {/* Minimal Editorial Footer */}
      <Box
        component="footer"
        sx={{
          width: "100%",
          bgcolor: "background.default",
          borderTop: "1px solid rgba(61, 15, 24, 0.7)",
          py: 2.5,
          px: { xs: 2.5, md: 8 },
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: 1440,
            mx: "auto",
          }}
        >
          <Typography
            variant="overline"
            sx={{ color: "#7A6F72", letterSpacing: "0.24em" }}
          >
            © 2025 DARKNESS COLLECTION LTD. TÜM HAKLARI SAKLIDIR.
          </Typography>
          <Typography
            variant="overline"
            sx={{ color: "#9E9E9E", letterSpacing: "0.24em" }}
          >
            PARİS — MİLANO — İSTANBUL — TOKYO
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default AuthShell;
