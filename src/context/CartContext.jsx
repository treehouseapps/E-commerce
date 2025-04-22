import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([])
    const [user, setUser] = useState([])
    const [cartVisibility, setcartVisibility] = useState(false)
    const [token, setToken] = useState(localStorage.getItem('token'))

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded.role);
                console.log(decoded.role)
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
        if (user == 'user') {
            try {
                const response = await fetch('http://localhost:3000/cart/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                const cartItem = await response.json()
                setCart(cartItem.products)
            } catch (error) {
                console.log(error)
            }
        }
    }
    const addToCart = async (item, quantity) => {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:3000/cart/add', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productId: item._id, quantity })
            })
            const result = await response.json()
        } catch (error) {
            console.log(error)
        }
        getItem()
    }
    const removeFromCart = async (indexToRemove) => {
        try {
            const item = await fetch('http://localhost:3000/cart/' + indexToRemove, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            const result = await item.json()
            console.log(result.message)
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