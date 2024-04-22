import React, { useState, createContext, useContext } from "react";
import { commerce } from "../lib/commerce";
import { loadStripe } from "@stripe/stripe-js";
const checkOutContext = createContext();

export const useCheckOutContext = () => useContext(checkOutContext);

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export const CheckOutProvider = ({ children }) => {
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [isCheckoutloading, setIsCheckoutloading] = useState(false);
  const [paymentInfo, setPayMentInfo] = useState(null);

  const createPaymentMethod = async (cardElement) => {
    try {
      const stripe = await stripePromise;
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });
      if (error) {
        console.log(error);
      } else {
        setPayMentInfo(paymentMethod);
      }
    } catch (err) {
      console.error("Error en la creacion del metodo de Pago:", err);
    }
  };

  const generateCheckoutToken = async (cartId) => {
    setIsCheckoutloading(true);
    try {
      const token = await commerce.checkout.generateToken(cartId, {
        type: "cart",
      });
      setCheckoutToken(token);
    } catch (err) {
      console.log("No se genero el token correctamente");
    } finally {
      setIsCheckoutloading(false);
    }
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder,
      );
      setPayMentInfo(incomingOrder);
    } catch (err) {
      console.log(newOrder);
      console.error("Error al capturar el checkout:", err.message);
    }
  };

  const value = {
    checkoutToken,
    setCheckoutToken,
    isCheckoutloading,
    generateCheckoutToken,
    handleCaptureCheckout,
    paymentInfo,
    createPaymentMethod,
    stripePromise,
  };

  return (
    <checkOutContext.Provider value={value}>
      {children}
    </checkOutContext.Provider>
  );
};
