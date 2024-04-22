import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 0;

export default makeStyles((theme) => ({
  appBar: {
    boxShadow: "none",
    overflowX: "hidden",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    backgroundColor: "#EBF4F5",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.up("sx")]: {
      border: "2px solid purple",
    },
  },
  title: {
    textDecoration: "none",
    color: "#0f0909",
  },
  Link: {
    color: "#0f0909",
    padding: "10px",
    textDecoration: "none",
    "&:visited": {
      textDecoration: "none",
    },
  },
  image: {
    marginRight: "10px",
    width: "50px",
    height: "70px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  grow: {
    flexGrow: 1,
  },
}));
