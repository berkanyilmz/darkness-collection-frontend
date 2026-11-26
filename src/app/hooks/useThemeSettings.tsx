'use client';
import { useSelector } from "@/store/useTypedHooks"
import { RootState } from "@/store/store";
import { BuildTheme } from "@/utils/theme/Theme";
import { useEffect } from "react";

const useThemeSettings = () => {
    // const activDir = useSelector((state: RootState) => state.customizer.activeDir);
    // const activeTheme = useSelector((state: RootState) => state.customizer.activeTheme);
    // const mode = useSelector((state: RootState) => state.customizer.activeMode);
    // const borderRadius = useSelector((state: RootState) => state.customizer.borderRadius);
    // const theme = BuildTheme({
    //     direction: activDir,
    //     theme: activeTheme,
    //     mode: mode,
    //     borderRadius: borderRadius,
    // });
    const theme = BuildTheme({
        direction: "ltr",
        theme: "BLACK_THEME",
        mode: "dark",
        borderRadius: 0,
    });
    useEffect(() => {
        document.dir = document.body.dir = theme.direction;
    }, [theme.direction]);

    return theme;
};

export { useThemeSettings };