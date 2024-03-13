import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";

import { useCheckOutContext } from "../../context/checkOutContext";
import Review from "./Review";
import Spinner from "../Spinner/Spinner";

const PaymentForm = ({ shippingData, backStep, nextStep }) => {
  console.log(shippingData);
  const {
    checkoutToken,
    isCheckoutLoading,
    handleCaptureCheckout,
    paymentInfo,
    createPaymentMethod,
    stripePromise,
  } = useCheckOutContext();
  if (!checkoutToken || !checkoutToken.line_items || isCheckoutLoading) {
    return (
      <Typography variant="subtitle1">
        Cargando información de pago..
        <Spinner />
      </Typography>
    );
  }

  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    try {
      if (!stripe || !elements) return;

      const cardElement = elements.getElement(CardElement);

      await createPaymentMethod(cardElement);

      if (paymentInfo) {
        const orderData = {
          line_items: checkoutToken.line_items,
          customer: {
            firstname: shippingData.firstName,
            lastname: shippingData.lastName,
            email: shippingData.email,
          },
          shipping: {
            name: "National",
            street: shippingData.address1,
            comune: shippingData.shippingComune,
            countyState: "SA",
            country: "CL",
          },
          payment: {
            gateway: "stripe",
            stripe: {
              payment_method_id: paymentInfo.id,
            },
          },
        };

        handleCaptureCheckout(checkoutToken.id, orderData);
        nextStep();
      }
    } catch (err) {
      console.error("Error en el manejo del pago:", err);
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />

      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Metodo de pago
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={backStep}>
                  Volver
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                >
                  Pagar {checkoutToken.subtotal.formatted_width_code}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
