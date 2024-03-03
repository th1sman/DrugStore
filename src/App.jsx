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
    const cartData = await commerce.cart.retrieve();
    setCart({
      total_items: cartData.total_items,
      subtotal: cartData.subtotal,
      line_items: cartData.line_items,
    });
  };

  const handleAddToCart = async (productId, quantity = {}) => {
    try {
      const item = await commerce.cart.add(productId, quantity);
      setCart({
        ...cart,
        total_items: cart.total_items + quantity,
        subtotal: cart.subtotal + item.line_total,
        line_items: [...cart.line_items, item],
      });
    } catch (err) {
      console.error("Error al agregar el producto al carrito", err);
    }
  };

  const handleUpdateCartQty = async (lineItemId, quantity) => {
    try {
      const updatedItems = cart.line_items.map((item) => {
        if (item.id === lineItemId) {
          return { ...item, quantity: quantity };
        }
        return item;
      });

      setCart({
        ...cart,
        line_items: updatedItems,
      });
    } catch (err) {
      console.error("Error al actualizar al carrito:", err);
    }
  };

  const handleRemoveFromCart = async (lineItemId) => {
    try {
      await commerce.cart.remove(lineItemId);
      const updatedItems = cart.line_items.filter(
        (item) => item.id !== lineItemId,
      );
      setCart({
        ...cart,
        total_items: cart.total_items - 1,
        line_items: updatedItems,
      });
    } catch (err) {
      console.error("Error al eliminar el producto del carrito:", err);
    }
  };

  const handleEmptyCart = async () => {
    try {
      await commerce.cart.empty();
      setCart({
        total_items: 0,
        subtotal: 0,
        line_items: [],
      });
    } catch (err) {
      console.error("Error al vaciar el carrito:", err);
    }
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart({
      total_items: newCart.total_items,
      subtotal: newCart.subtotal,
      line_items: newCart.line_items,
    });
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
            totalItems={cart.total_items}
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
