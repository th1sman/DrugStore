import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    backgroundColor: "#CBDFEA",
    paddingTop: "5%",
  },
  content: {
    justifyContent: "space-around",
  },
  aboutPic: {
    objectFit: "contain",
    width: "100%",
    height: "80vh",
    objectPosition: "50% 20%",
    filter: "grayscale(20%)",
  },
  paragraph: {
    padding: "20px",
  },
}));
