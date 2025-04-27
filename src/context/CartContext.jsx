import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext()

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([])
    const [user, setUser] = useState([null])
    const [cartVisibility, setcartVisibility] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('token'))

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
        if (user?.role === 'user') {
            getItem()
        }
    }, [user])

    const updateCart = (productId, value) => {
        const localCart = [...cart];

        const existingIndex = localCart.findIndex(item => item.product._id === productId);
        if (existingIndex !== -1 && value > 0) {
            localCart[existingIndex].quantity = value;
            if (user?.role == 'user') { localStorage.setItem(`cart_${user.userId}`, JSON.stringify(localCart)); }
            setCart(localCart);
        }
    }
    const getItem = async () => {
        if (user.role == 'user') {
            try {
                const localCart = JSON.parse(localStorage.getItem(`cart_${user.userId}`)) || [];
                setCart(localCart)
            } catch (error) {
                console.log(error)
            }
        }
    }
    const addToCart = async (product, quantity) => {

        try {
            let updatedCart = [...cart];
            const existingIndex = updatedCart.findIndex(item => item.product._id === product._id);

            if (existingIndex !== -1) {
                updatedCart[existingIndex].quantity += quantity;
            } else {
                updatedCart.push({ product, quantity });
            }

            if (user?.role === 'user') {
                localStorage.setItem(`cart_${user.userId}`, JSON.stringify(updatedCart));
            }
            setCart(updatedCart);
        } catch (error) {
            console.log(error)
        }
        getItem()
    }

    const removeFromCart = async (productId) => {
        try {
            const updatedCart = cart.filter(item => item.product._id !== productId);
            if (user?.role === 'user') { localStorage.setItem(`cart_${user.userId}`, JSON.stringify(updatedCart)); }
            setCart(updatedCart);
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
        <CartContext.Provider value={{ user, cart, addToCart, updateCart, removeFromCart, cartVisibility, openCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider