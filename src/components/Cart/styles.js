import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    height: "95vh",
  },
  toolbar: theme.mixins.toolbar,
  emptyButton: {
    minWidth: "100px",
  },
  checkoutButton: {
    minWidth: "150px",
  },
  link: {
    textDecoration: "none",
  },
  cardDetails: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
}));
