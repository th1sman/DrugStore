import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce';
//Haciendo importes de componentes como niño grande 🚸
import  { Products, Navbar } from './components';

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
        setCart(item.cart)
    }

    useEffect(() => {
        fetchProducts();
        fetchCart();
    }, []);

    console.log(cart)

    return (
        <div>
            <Navbar totalItems={cart.total_items} />
            <Products products={products} onAddToCart={handleAddToCart} />
        </div>
    )
}
 
export default App
