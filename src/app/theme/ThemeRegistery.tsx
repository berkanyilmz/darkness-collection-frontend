"use client";
import "@/utils/theme/i18n";
import * as React from "react";
import { CacheProvider } from "@emotion/react";
import CssBaseline from '@mui/material/CssBaseline'
import createEmotionCache from "./createEmotionCache";
import { useThemeSettings } from "../hooks/useThemeSettings";
import { ThemeProvider } from "@mui/material/styles"

// Client-Side emotion cache
const clientSideEmotionCache = createEmotionCache();

export default function ThemeRegistry({
    children,
}: {
    children: React.ReactNode;
}) {
    const theme = useThemeSettings();

    return (
        <CacheProvider value={clientSideEmotionCache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CacheProvider>
    );
}