"use client";
import "@/utils/theme/i18n";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { NextAppDirEmotionCacheProvider } from "@/utils/theme/EmotionCache";
import { useThemeSettings } from "../hooks/useThemeSettings";

export default function ThemeRegistry({
    children,
}: {
    children: React.ReactNode;
}) {
    const theme = useThemeSettings();

    return (
        <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </NextAppDirEmotionCacheProvider>
    );
}
