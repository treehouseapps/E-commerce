import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([])
    const [user, setUser] = useState([])
    const [cartVisibility, setcartVisibility] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const url = 'https://th-ecommerce-api.vercel.app/'

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
            } catch (err) {
                console.error("Invalid token", err);
                setUser('none');
            }
        }
    }, [token]);
    useEffect(() => {
        getItem()
    }, [user])

    const getItem = async () => {
        if (user.role == 'user') {

            try {
                const localCart = JSON.parse(localStorage.getItem(`cart_${user.userId}`)) || [];
                // const response = await fetch(url + 'cart/', {
                //     method: 'GET',
                //     headers: {
                //         'Authorization': `Bearer ${token}`,
                //         'Content-Type': 'application/json'
                //     }
                // })
                // const cartItem = await response.json()
                setCart(localCart)
            } catch (error) {
                console.log(error)
            }
        }
    }
    const addToCart = async (product, quantity) => {
        if (user.role == 'user') {
            try {
                let localCart = JSON.parse(localStorage.getItem(`cart_${user.userId}`)) || [];

                const existingIndex = localCart.findIndex(item => item.product._id === product._id);

                if (existingIndex !== -1) {
                    // Product already exists → update quantity
                    localCart[existingIndex].quantity += quantity;
                } else {
                    // Product not in cart → add new
                    localCart.push({ product, quantity });
                }

                localStorage.setItem(`cart_${user.userId}`, JSON.stringify(localCart));
                setCart(localCart);

                // Send to DB in background
                // fetch(url + 'cart/add', {
                //     method: 'POST',
                //     headers: {
                //         'Authorization': `Bearer ${token}`,
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify({ productId: product._id, quantity })
                // }).catch(console.log);
            } catch (error) {
                console.log(error)
            }
            getItem()
        }
    }
    const removeFromCart = async (productId) => {
        try {
            const cart = JSON.parse(localStorage.getItem(`cart_${user.userId}`)) || [];
            const updatedCart = cart.filter(item => item.product._id !== productId);
            localStorage.setItem(`cart_${user.userId}`, JSON.stringify(updatedCart));
            setCart(updatedCart);

            // const item = await fetch(url + 'cart/' + indexToRemove, {
            //     method: 'DELETE',
            //     headers: {
            //         'Authorization': `Bearer ${token}`,
            //         'Content-Type': 'application/json'
            //     }
            // })
            // const result = await item.json()
            // console.log(result.message)
        } catch (error) {
            console.log(error)
        }
        getItem()
    }

    const openCart = () => {
        setcartVisibility((!cartVisibility));
    }
    if (!cart) { setCart([]) }
    return (
        <CartContext.Provider value={{ user, cart, addToCart, removeFromCart, cartVisibility, openCart }}>
            {children}
        </CartContext.Provider>
    )
}