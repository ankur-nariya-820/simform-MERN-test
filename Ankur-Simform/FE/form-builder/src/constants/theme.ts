import { createMuiTheme } from "@material-ui/core/styles";

// This will let us override Material UI's default theme with our own color, typography, etc.
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1976d2",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#11b648",
    },
  },
  overrides: {
    MuiTextField: {
      root: {
        maxHeight: 49,
      },
    },
    MuiInputLabel: {
      root: {
        top: "-9px !important",
      },
      shrink: {
        transform: `translate(0px, 2px) scale(0.75) !important`,
      },
    },
    MuiInputBase: {
      root: {
        maxHeight: 49,
      },
    },
    MuiOutlinedInput: {
      root: {
        paddingLeft: '8px !important',
      },
      input: {
        padding: "9px 9px",
      },
    },
    MuiTableRow: {
      root: {
        fontSize: "14px",
        "& > .MuiTableCell-root": {
          padding: '16px 8px'
        },
        "& > .MuiTableCell-root:last-child": {
          padding: '16px 16px 16px 8px'
        },
        "& > .MuiTableCell-root:first-child": {
          padding: '16px 8px 16px 16px'
        },
        "&$selected": {
          "& > .MuiTableCell-root": {
            fontWeight: "bold !important",
          },
          backgroundColor: "rgba(51,118,208,0.10) !important",
        },
      },
      head: {
        "& > .MuiTableCell-root": {
          color: "#3A0E97 !important",
          fontWeight: "bold",
        },
      },
    },
    MuiTableCell: {
      body: {
        color: '#333333'
      }
    },
    MuiTableSortLabel: {
      icon: {
        color: "#3A0E97 !important",
      },
      active: {
        color: "#3A0E97 !important",
      },
      root: {
        color: "#3A0E97 !important",
      },
    },
    MuiTablePagination: {
      select: {
        fontSize: "12px",
      },
      caption: {
        fontSize: "12px",
      },
      selectRoot: {
        border: "1px solid #BDBDBD",
        borderRadius: "4px",
        height: "26px",
      },
      actions: {
        "& > .MuiButtonBase-root": {
          padding: "0px",
          margin: "12px",
          borderRadius: "4px",
          backgroundColor: "#09B3EA",
          border: "1px solid #09B3EA",
          color: "#FFFFFF",
        },
        "& > .Mui-disabled": {
          border: "1px solid #BDBDBD",
          backgroundColor: "#FFFFFF",
          color: "#E0E0E0",
        },
      },
    },
    MuiDialogTitle: {
      root: {
        boxShadow: "0px 4px 5px 0px #444e6d1a !important",
        maxHeight: "47px",
        padding: "8px 16px !important",
        "& > .MuiTypography-root": {
          fontSize: "1rem",
        },
        "& > .MuiButtonBase-root": {
          top: "5px",
          color: "#333333",
          right: "7px",
          padding: "4px",
          width: "30px",
          height: "30px",
          "& > .MuiSvgIcon-root": {
            width: "20px",
            height: "20px",
          },
        },
      },
    },
    MuiRadio: {
      root: {
        paddingRight: 4
      }
    }
  },
});
