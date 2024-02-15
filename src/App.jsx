import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import Navbar from "./components/Navbar/Navbar";
import CheckoutForm from "./components/CheckoutForm/Checkout/Checkout";
import Cart from "./components/Cart/Cart";
import { ProductDetail } from "./Pages/Products/Product/ProductDetail/ProductDetail";
import { Products } from "./Pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import "./App.css";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data); //products populated
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve()); //get the cart and set the State.
  };

  const handleAddToCart = async (productId, quantity, option = {}) => {
    //this is the cart After the product has been added
    const item = await commerce.cart.add(productId, quantity, {
      ...option,
    });
    setCart(item.cart);
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    const response = await commerce.cart.update(lineItemId, { quantity });
    setCart(response.cart);
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const response = await commerce.cart.remove(lineItemId);
    setCart(response.cart);
  };

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();
    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckOut = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder,
      );

      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar totalItems={cart.total_items}></Navbar>
          <Routes>
            <Route
              path="/"
              element={
                <Products
                  products={products}
                  onAddToCart={handleAddToCart}
                  handleUpdateCartQty
                />
              }
            />
            <Route
              path="/productos/:productID"
              element={
                <ProductDetail
                  products={products}
                  onAddToCart={handleAddToCart}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  cart={cart}
                  onUpdateCartQty={handleUpdateCartQty}
                  onRemoveFromCart={handleRemoveFromCart}
                  onEmptyCart={handleEmptyCart}
                />
              }
            />
            <Route
              path="/checkout"
              element={
                <CheckoutForm
                  cart={cart}
                  order={order}
                  onCaptureCheckOut={handleCaptureCheckOut}
                  error={errorMessage}
                />
              }
            ></Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
