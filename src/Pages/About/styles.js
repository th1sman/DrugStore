import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff0c2",
  },
  content: {
    justifyContent: "space-around",
  },
  aboutPic: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
    objectPosition: "50% 20%",
    filter: "grayscale(20%)",
  },
  paragraph: {
    padding: "20px",
  },
}));
