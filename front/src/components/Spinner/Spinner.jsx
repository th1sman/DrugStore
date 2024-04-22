import "./styles.css";
import { Skeleton } from "@mui/material";
const Spinner = () => (
  <div className="spinnerContainer">
    <Skeleton variant="circular" animation="wave" width={500} height={500} />
  </div>
);

export default Spinner;
