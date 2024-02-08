import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    paddingTop: 100,
    alignItems: "center",
  },
  root: {
    maxWidth: 345,
    margin: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    transition: "0.3s",
    "&:hover": {
      boxShadow: theme.shadows[6],
    },
  },
  media: {
    height: 140,
    backgroundSize: "contain",
  },
}));
