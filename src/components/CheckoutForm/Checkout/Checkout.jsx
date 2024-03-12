import React, { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CssBaseline,
} from "@material-ui/core";
import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import Spinner from "../../Spinner/Spinner";
import Confirmation from "../Confirmation";
import { useCartContext } from "../../../context/cartContext";
import { useCheckOutContext } from "../../../context/checkOutContext";

const steps = ["Dirección de envio", "Detalles del pago"];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles();

  const { cart } = useCartContext();
  const {
    checkoutToken,
    generateCheckoutToken,
    isCheckoutLoading,
    handleCaptureCheckout,
  } = useCheckOutContext();

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  useEffect(() => {
    if (cart.id && !checkoutToken && !isCheckoutLoading) {
      generateCheckoutToken(cart.id);
    }
  }, [cart, checkoutToken, generateCheckoutToken, isCheckoutLoading]);

  const test = (data) => {
    setShippingData(data);
    nextStep();
  };

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        setShippingData={setShippingData}
        test={test}
      />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        handleCaptureCheckout={handleCaptureCheckout}
      />
    );
  if (isCheckoutLoading) return <Spinner />;

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Proceso de pago
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation
              checkoutToken={checkoutToken}
              shippingData={shippingData}
            />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
};

export default Checkout;
