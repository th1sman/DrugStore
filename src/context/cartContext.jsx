import React, { createContext, useState, useContext, useEffect } from "react";
import { commerce } from "../lib/commerce";

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    total_items: 0,
    line_items: [],
    subtotal: { formatted_with_symbol: "0" },
  });

  const fetchCart = async () => {
    const cartData = await commerce.cart.retrieve();
    setCart(cartData);
  };

  const handleAddToCart = async (productId, quantity) => {
    const { cart: updatedCart } = await commerce.cart.add(productId, quantity);
    setCart(updatedCart);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    if (quantity > 0) {
      const { cart: updatedCart } = await commerce.cart.update(lineItemId, {
        quantity,
      });
      setCart(updatedCart);
    } else {
      handleRemoveFromCart(lineItemId);
    }
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const { cart: updatedCart } = await commerce.cart.remove(lineItemId);
    setCart(updatedCart);
  };

  const handleEmptyCart = async () => {
    const { cart: updatedCart } = await commerce.cart.empty();
    setCart(updatedCart);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const value = {
    cart,
    setCart,
    handleAddToCart,
    handleUpdateCartQty,
    handleRemoveFromCart,
    handleEmptyCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
