import { Bodoni_Moda, Manrope, Plus_Jakarta_Sans } from "next/font/google";

export const bodoni = Bodoni_Moda({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const manrope = Manrope({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const plus = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const typography = {
  fontFamily: manrope.style.fontFamily,
  h1: {
    fontFamily: bodoni.style.fontFamily,
    fontWeight: 500,
    fontSize: "3rem",
    lineHeight: 1.1,
    letterSpacing: "0.02em",
  },
  h2: {
    fontFamily: bodoni.style.fontFamily,
    fontWeight: 500,
    fontSize: "2.25rem",
    lineHeight: 1.15,
    letterSpacing: "0.02em",
  },
  h3: {
    fontFamily: bodoni.style.fontFamily,
    fontWeight: 500,
    fontSize: "1.75rem",
    lineHeight: 1.25,
    letterSpacing: "0.01em",
  },
  h4: {
    fontFamily: bodoni.style.fontFamily,
    fontWeight: 500,
    fontSize: "1.5rem",
    lineHeight: 1.3,
    letterSpacing: "0.01em",
  },
  h5: {
    fontFamily: bodoni.style.fontFamily,
    fontWeight: 500,
    fontSize: "1.25rem",
    lineHeight: 1.35,
  },
  h6: {
    fontFamily: bodoni.style.fontFamily,
    fontWeight: 500,
    fontSize: "1rem",
    lineHeight: 1.4,
  },
  button: {
    fontFamily: manrope.style.fontFamily,
    textTransform: "uppercase" as const,
    fontWeight: 600,
    letterSpacing: "0.22em",
  },
  body1: {
    fontFamily: manrope.style.fontFamily,
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.6,
  },
  body2: {
    fontFamily: manrope.style.fontFamily,
    fontSize: "0.8125rem",
    fontWeight: 300,
    lineHeight: 1.55,
  },
  subtitle1: {
    fontFamily: manrope.style.fontFamily,
    fontSize: "0.875rem",
    fontWeight: 400,
  },
  subtitle2: {
    fontFamily: manrope.style.fontFamily,
    fontSize: "0.8125rem",
    fontWeight: 500,
  },
  overline: {
    fontFamily: manrope.style.fontFamily,
    fontSize: "0.625rem",
    fontWeight: 600,
    lineHeight: 1.4,
    letterSpacing: "0.26em",
    textTransform: "uppercase" as const,
  },
};

export default typography;
