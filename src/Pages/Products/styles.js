import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    paddingTop: 100,
    width: "100%",
    border: "2px solid purple",
    backgroundColor: "#A3C6D0",
  },
  root: {
    maxWidth: 450,
    margin: theme.spacing(5),
    borderRadius: theme.shape.borderRadius,
    transition: "0.3s",
    "&:hover": {},
  },
  media: {
    height: 200,
    backgroundSize: "contain",
  },
}));
