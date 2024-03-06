import React, { useState, createContext, useContext } from "react";
import { commerce } from "../lib/commerce";
const checkOutContext = createContext();

export const useCheckOutContext = () => useContext(checkOutContext);

export const CheckOutProvider = ({ children }) => {
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [isCheckoutloading, setIsCheckoutloading] = useState(false);

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

  const value = {
    checkoutToken,
    setCheckoutToken,
    isCheckoutloading,
    generateCheckoutToken,
  };

  return (
    <checkOutContext.Provider value={value}>
      {children}
    </checkOutContext.Provider>
  );
};
