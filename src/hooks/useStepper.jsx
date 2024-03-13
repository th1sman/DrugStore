import { useState } from "react";

const useStepper = (initialStep = 0) => {
  const [activeStep, setActiveStep] = useState(initialStep);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  return { activeStep, nextStep, backStep };
};

export default useStepper;
