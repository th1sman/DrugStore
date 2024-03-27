import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    paddingTop: 100,
    alignItems: "center",
    backgroundColor: "#A3C6D0",
  },
  root: {
    maxWidth: 420,
    margin: theme.spacing(5),
    borderRadius: theme.shape.borderRadius,
    transition: "0.3s",
    "&:hover": {},
  },
  media: {
    maxWidth: 100,
    height: 140,
    backgroundSize: "contain",
  },
}));
