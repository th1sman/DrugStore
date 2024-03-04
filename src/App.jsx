import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import CheckoutForm from "./components/CheckoutForm/Checkout/Checkout";
import Cart from "./components/Cart/Cart";
import About from "./Pages/About/About";
import { commerce } from "./lib/commerce";
import { ProductDetail } from "./Pages/Products/Product/ProductDetail/ProductDetail";
import { Products } from "./Pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import "./App.css";

import { CartProvider } from "./context/cartContext";

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const handleCaptureCheckOut = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder,
      );

      setOrder(incomingOrder);
      refreshCart();
    } catch (err) {
      setErrorMessage(err.data.err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <CartProvider>
      <div className="App">
        <ThemeProvider theme={theme}>
          <Router>
            <Navbar handleDrawerToggle={handleDrawerToggle} />
            <Routes>
              <Route path="/" element={<Products products={products} />} />
              <Route path="/nosotros" element={<About />} />

              <Route
                path="/productos/:productID"
                element={<ProductDetail products={products} />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/checkout"
                element={
                  <CheckoutForm
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
    </CartProvider>
  );
};

export default App;
