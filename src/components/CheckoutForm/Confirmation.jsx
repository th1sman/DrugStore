import React from "react";
import { Typography, Button, CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useCheckOutContext } from "../../context/checkOutContext";
import { useCartContext } from "../../context/cartContext";

const Confirmation = ({ shippingData }) => {
  const { isCheckoutLoading, error, paymentInfo, checkoutToken } =
    useCheckOutContext();

  console.log(paymentInfo);
  if (error) {
    return (
      <>
        <Typography variant="h5">Error: {error}</Typography>
        <Button component={Link} to="/" variant="outlined" type="button">
          Volver al inicio
        </Button>
      </>
    );
  }

  if (isCheckoutLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  if (!paymentInfo || Object.keys(paymentInfo).length === 0) {
    return (
      <>
        <Typography variant="h5">No se encontró la orden</Typography>
        <Button component={Link} to="/" variant="outlined" type="button">
          Volver al inicio
        </Button>
      </>
    );
  }

  const orderReference = checkoutToken.id ?? "N/A";

  return (
    <>
      <Typography variant="h5">
        Gracias por tu compra, {shippingData.firstName} {shippingData.lastName}!
      </Typography>
      <Typography variant="subtitle2">
        Número de orden: {orderReference}
      </Typography>
      <Button component={Link} variant="outlined" type="button" to="/">
        Volver al inicio
      </Button>
    </>
  );
};

export default Confirmation;
