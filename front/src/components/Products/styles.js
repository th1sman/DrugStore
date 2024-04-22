import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    alignItems: "center",
    paddingTop: 35,
  },
  root: {
    maxWidth: 420,
    margin: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    transition: "0.3s",
    "&:hover": {},
  },
  media: {
    maxWidth: 100,
    height: 140,
  },
}));
