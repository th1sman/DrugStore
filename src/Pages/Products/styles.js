import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    paddingTop: 100,
    maxWidth: "100%",
    backgroundColor: "#A3C6D0",
  },
  root: {
    maxWidth: 420,
    margin: 6,
    borderRadius: theme.shape.borderRadius,
    transition: "0.3s",
    "&:hover": {},
  },
  media: {
    height: 200,
    backgroundSize: "contain",
  },
}));
