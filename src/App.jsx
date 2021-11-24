import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce';
//Haciendo importes de componentes como niño grande 🚸
import  { Products, Navbar, Cart, Checkout } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
    const [products, setProducts] = useState([]); // useState  = empty array
    const [cart, setCart] = useState({}); // useState = empty object.

        const fetchProducts = async () => {

        const { data } = await commerce.products.list(); // data = products
        setProducts(data); //products populated
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve()) //get the cart and set the State.
    }

    const handleAddToCart = async (productId, quantity) => { //this is the cart After the product has been added
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart);
    }

    const handleUpdateCartQty = async (lineItemId, quantity) => {
         const response = await commerce.cart.update(lineItemId, { quantity })
         setCart(response.cart);
    }

    const handleRemoveFromCart = async (lineItemId) => {
        const response = await commerce.cart.remove(lineItemId);
        setCart(response.cart)
    }

    const handleEmptyCart = async () => {
        const response = await commerce.cart.empty()
        setCart(response.cart)
    }


    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    return (
        <Router>
      <div style={{ display: 'flex' }}>
        <Navbar totalItems={cart.total_items}/>
        <Routes>
          <Route  path="/" element={<Products products={products} onAddToCart={handleAddToCart} handleUpdateCartQty />}>
          </Route>
          <Route  path="/cart" element={<Cart cart={cart} onUpdateCartQty={handleUpdateCartQty} onRemoveFromCart={handleRemoveFromCart} onEmptyCart={handleEmptyCart} />}>
          </Route>
          <Route path="/checkout" element={<Checkout cart={cart} />}>
          </Route>
        </Routes>
      </div>
    </Router>
    )
}
 
export default App
