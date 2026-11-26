// project imports
import "./DefaultColors";
import { Components, Theme } from "@mui/material/styles";


const components = (theme: Theme): Components => {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          height: "100%",
          width: "100%",
        },
        a: {
          textDecoration: "none",
        },
        body: {
          height: "100%",
          margin: 0,
          padding: 0,
        },
        "input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus": {
          WebkitTextFillColor: theme.palette.text.primary,
          WebkitBoxShadow: `0 0 0px 1000px ${theme.palette.grey[100]} inset`,
          transition: "background-color 5000s ease-in-out 0s",
          caretColor: theme.palette.text.primary,
        },
        "#root": {
          height: "100%",
        },
        '.mui-nniyr1-MuiCollapse-root-MenuBar-root-RichTextField-menuBar-MenuBar-sticky, .mui-anumxs-FieldContainer-notchedOutline': {
          borderColor: `${theme.palette.divider} !important`,
        },
        "*[dir='rtl'] .buyNowImg": {
          transform: "scaleX(-1)",
        },
        ".border-none": {
          border: "0px",
          td: {
            border: "0px",
          },
        },
        ".btn-xs": {
          minWidth: "30px !important",
          width: "30px",
          height: "30px",
          borderRadius: "6px !important",
          padding: "0px !important",
        },
        ".hover-text-primary:hover .text-hover": {
          color: theme.palette.primary.main,
        },
        ".code-dialog pre": {
          background: `${theme.palette.primary.light} !important`,
          borderRadius: theme.shape.borderRadius,
        },
        ".hoverCard:hover": {
          scale: "1.01",
          transition: " 0.1s ease-in",
        },
        ".signup-bg": {
          position: "absolute",
          top: 0,
          right: 0,
          height: "100%",
        },
        ".MuiBox-root": {
          borderRadius: theme.shape.borderRadius,
        },
        ".MuiCardHeader-action": {
          alignSelf: "center !important",
        },
        ".emoji-picker-react .emoji-scroll-wrapper": {
          overflowX: "hidden",
        },
        ".scrollbar-container": {
          borderRight: "0 !important",
        },
        ".theme-timeline .MuiTimelineOppositeContent-root": {
          minWidth: "90px",
        },
        ".MuiAlert-root .MuiAlert-icon": {
          color: "inherit!important",
        },
        ".MuiTimelineConnector-root": {
          width: "1px !important",
          backgroundColor: theme.palette.divider,
        },
        " .simplebar-scrollbar:before": {
          background: `${theme.palette.grey[300]} !important`,
        },
        hr: {
          height: "1px",
          border: 0,
          borderTop: `1px solid ${theme.palette.divider}`,
        },
        "@keyframes marquee": {
          "0%": {
            transform: "translate3d(0,0,0)",
          },
          "100% ": {
            transform: "translate3d(-2086px,0,0)",
          },
        },
        "@keyframes marquee2": {
          "0%": {
            transform: "translate3d(-2086px,0,0)",
          },
          "100% ": {
            transform: "translate3d(0,0,0)",
          },
        },
        "@keyframes gradient": {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: " 100% 50%",
          },
          "100% ": {
            backgroundPosition: " 0% 50%",
          },
        },
        ".rounded-bars .apexcharts-bar-series.apexcharts-plot-series .apexcharts-series path":
        {
          clipPath: "inset(0 0 5% 0 round 20px)",
        },
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          ":before": {
            backgroundColor: theme.palette.grey[100],
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        line: {
          borderColor: theme.palette.divider,
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
        sizeSmall: {
          width: 30,
          height: 30,
          minHeight: 30,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
          },
        },
        colorPrimary: {
          "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: "white",
          },
        },
        colorSecondary: {
          "&:hover": {
            backgroundColor: theme.palette.secondary.main,
            color: "white",
          },
        },
        colorSuccess: {
          "&:hover": {
            backgroundColor: theme.palette.success.main,
            color: "white",
          },
        },
        colorError: {
          "&:hover": {
            backgroundColor: theme.palette.error.main,
            color: "white",
          },
        },
        colorWarning: {
          "&:hover": {
            backgroundColor: theme.palette.warning.main,
            color: "white",
          },
        },
        colorInfo: {
          "&:hover": {
            backgroundColor: theme.palette.info.main,
            color: "white",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          variants: [
            ...(["primary", "secondary", "success", "error", "info", "warning"] as const).map(
              (color) => ({
                props: { variant: "text" as const, color },
                style: {
                  backgroundColor: theme.palette[color].light,
                  "&:hover": {
                    backgroundColor: theme.palette[color].main,
                    color: "white",
                  },
                },
              })
            ),
            ...(["primary", "secondary", "success", "error", "info", "warning"] as const).map(
              (color) => ({
                props: { variant: "outlined" as const, color },
                style: {
                  "&:hover": {
                    backgroundColor: theme.palette[color].main,
                    color: "white",
                  },
                },
              })
            ),
          ],
        },
        text: {
          padding: "5px 15px",
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "16px 24px",
        },
        title: {
          fontSize: "1.125rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          width: "100%",
          padding: "15px",
          backgroundImage: "none",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "24px",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:last-child td": {
            borderBottom: 0,
          },
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          paddingTop: "30px",
          paddingLeft: "30px !important",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey[200],
          borderRadius: "6px",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.divider,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: "0.75rem",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        filled: {
          color: "white",
        },
        root: {
          variants: [
            ...(["success", "error", "warning", "info"] as const).map((severity) => ({
              props: { variant: "standard" as const, severity },
              style: {
                backgroundColor: theme.palette[severity].light,
                color: theme.palette[severity].main,
              },
            })),
            ...(["success", "error", "warning", "info"] as const).map((severity) => ({
              props: { variant: "outlined" as const, severity },
              style: {
                borderColor: theme.palette[severity].main,
                color: theme.palette[severity].main,
              },
            })),
          ],
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor:
              theme.palette.mode === "dark"
                ? theme.palette.grey[200]
                : theme.palette.grey[300],
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.grey[300],
          },
        },
        input: {
          padding: "12px 14px",
          variants: [
            {
              props: { size: "small" },
              style: {
                padding: "8px 14px",
              },
            },
          ],
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            padding: '4px 9px'
          }
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.palette.background.paper,
          background: theme.palette.text.primary,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderColor: `${theme.palette.divider}`,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          border: `1px solid ${theme.palette.secondary.main}`,
          backgroundColor: theme.palette.background.default,
          boxShadow: "none",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: "1.35rem",
          fontFamily: theme.typography.h4.fontFamily,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow:
            "rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",
        },
      },
    },
  };
};
export default components;