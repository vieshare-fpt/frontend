export const styles = {
  box: (open, asPath) => {
    if (asPath) open = true;
    return {
      minHeight: open ? "calc(100vh - 120px)" : "",
      ".Mui-selected": {
        backgroundColor: "rgb(50, 214, 61, 0.08) !important",
      },
    };
  },
  listItem: {
    display: "block",
    ".MuiListItemButton-root:hover": {
      backgroundColor: "rgb(50, 214, 61, 0.08)",
    },
  },
  listItemButton: (open, asPath) => {
    if (asPath) open = true;

    return {
      justifyContent: open ? "initial" : "center",
      minHeight: 48,
      px: 2.5,
      ".MuiTypography-root": {
        fontSize: "0.85rem",
        fontWeight: "400",
        fontFamily: "Roboto",
      },
    };
  },
  listItemIcon: (open, asPath) => {
    if (asPath) open = true;

    return {
      minWidth: 0,
      mr: open ? 3 : "auto",
      justifyContent: "center",
      ".MuiSvgIcon-root": {
        fontSize: "1.5rem",
      },
    };
  },
  listItemText: (open, asPath) => {
    if (asPath) open = true;

    return {
      opacity: open ? 1 : 0,
      color: "#2e7d32",
    };
  },
  footer: (open, asPath) => {
    if (asPath) open = true;

    return {
      opacity: open ? 1 : 0,
      color: "rgb(62, 80, 96)",
      fontSize: "11px",
    };
  },
  drawerSearchMobile: {
    width: "95%",

    [`& fieldset`]: {
      borderRadius: 8,
    },
    [`&:hover fieldset`]: {},
  },
  appBar: {
    background: "rgba(255, 255, 255, 0.98)",
    boxShadow: "none",
    // borderBottom: "1px solid #E7EBF0",
  },
};

