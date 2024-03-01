import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import Navbar from "./components/Navbar/Navbar";
import CheckoutForm from "./components/CheckoutForm/Checkout/Checkout";
import Cart from "./components/Cart/Cart";
import About from "./Pages/About/About";
import { ProductDetail } from "./Pages/Products/Product/ProductDetail/ProductDetail";
import { Products } from "./Pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import "./App.css";

const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ total_items: 0 });
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity = {}) => {
    try {
      const item = await commerce.cart.add(productId, quantity);
      setCart(item);
    } catch (err) {
      console.error("Error al agregar el producto al carrito", err);
    }
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    try {
      const { cart: updateCart } = await commerce.cart.update(lineItemId, {
        quantity,
      });
      setCart(updateCart);
    } catch (err) {
      console.error("Error al actualizar al carrito:", err);
    }
  };

  const handleRemoveFromCart = async (lineItemId) => {
    try {
      await commerce.cart.remove(lineItemId);
      fetchCart();
    } catch (err) {
      console.error("Error al eliminar el producto del carrito:", err);
    }
  };

  const handleEmptyCart = async () => {
    try {
      await commerce.cart.empty();
      setCart({ total_items: 0, line_items: [] });
    } catch (err) {
      console.error("Error al vaciar el carrito:", err);
    }
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
    } catch (err) {
      setErrorMessage(err.data.err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar
            totalItems={cart && cart.total_items}
            handleDrawerToggle={handleDrawerToggle}
          />
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
            <Route path="/nosotros" element={<About />} />

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
