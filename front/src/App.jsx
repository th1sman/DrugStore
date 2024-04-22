import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import CheckoutForm from "./components/CheckoutForm/Checkout/Checkout";
import Cart from "./components/Cart/Cart";
import About from "./Pages/About/About";
import { commerce } from "./lib/commerce";
import { ProductDetail } from "./components/Products/Product/ProductDetail/ProductDetail";
import { Products } from "./components/Products/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import "./App.css";

import { CartProvider } from "./context/cartContext";
import { CheckOutProvider } from "./context/checkOutContext";

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <CartProvider>
      <CheckOutProvider>
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
                  element={<CheckoutForm error={errorMessage} />}
                ></Route>
              </Routes>
            </Router>
          </ThemeProvider>
        </div>
      </CheckOutProvider>
    </CartProvider>
  );
};

export default App;
