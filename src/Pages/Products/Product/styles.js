import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    maxWidth: 345,
    backgroundColor: "#EBF4F5",
  },
  media: {
    height: "100px",
    backgroundColor: "white",
    paddingTop: "80.25%", // 16:9
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

