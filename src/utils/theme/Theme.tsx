import _ from 'lodash';
import { createTheme } from '@mui/material/styles';
import components from './Components';
import typography from './Typography';
import { shadows, darkshadows } from './Shadows';
import { DarkThemeColors } from './DarkThemeColors';
import { LightThemeColors } from './LightThemeColors';
import { baseDarkTheme, baselightTheme } from './DefaultColors';
import * as locales from '@mui/material/locale';
import LinkBehavior from '@/app/components/shared/LinkBehavior/LinkBehavior';

export const themeNames = [
  'BLUE_THEME',
  'GREEN_THEME',
  'PURPLE_THEME',
  'ORANGE_THEME',
  'CYAN_THEME',
  'AQUA_THEME',
  'BLACK_THEME',
] as const;
export type ThemeName = typeof themeNames[number];

export interface ThemeConfig {
  theme?: ThemeName
  mode: 'light' | 'dark';
  borderRadius?: number;
  direction: 'ltr' | 'rtl';
}

export const BuildTheme = (config: Partial<ThemeConfig> = {}) => {
  const themeOptions = LightThemeColors.find((theme) => theme.name === config.theme);
  const darkthemeOptions = DarkThemeColors.find((theme) => theme.name === config.theme);
  const defaultTheme = config.mode === 'dark' ? baseDarkTheme : baselightTheme;
  const defaultShadow = config.mode === 'dark' ? darkshadows : shadows;
  const themeSelect = config.mode === 'dark' ? darkthemeOptions : themeOptions;
  const baseMode = {
    palette: {
      mode: config.mode,
    },
    shape: {
      borderRadius: config.borderRadius,
    },
    shadows: defaultShadow,
    typography: typography,
  };

  const theme = createTheme(
    _.merge({}, baseMode, defaultTheme, locales, themeSelect, {
      direction: config.direction,
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
          xxl: 1920,
          xxxl: 2560
        },
      },
      components: {
        MuiLink: {
          defaultProps: {
            component: LinkBehavior,
          },
        },
        MuiButtonBase: {
          defaultProps: {
            LinkComponent: LinkBehavior
          }
        },
        MuiContainer: {
          defaultProps: {
            disableGutters: true,   // Varsayılan padding'i kapat
          },
        },
      }
    }),
  );
  theme.components = {
    ...theme.components,
    ...components(theme),
  };
  return theme;
};
