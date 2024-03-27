import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 0;

export default makeStyles((theme) => ({
  appBar: {
    boxShadow: "none",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    backgroundColor: "#EBF4F5",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  title: {
    textDecoration: "none",
    color: "#0f0909",
  },
  Link: {
    color: "#0f0909",
    textDecoration: "none",
    padding: "10px",
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
    [theme.breakpoints.down("xs")]: {
      border: "2px solid green",
    },
  },
}));
