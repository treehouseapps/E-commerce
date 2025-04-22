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
    const getItem = async () => {
        const key = localStorage.getItem('token')
        if (user == 'user') {
            try {
                const response = await fetch('http://localhost:3000/cart/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${key}`,
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
    getItem()
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
            alert(result.message)
        } catch (error) {
            console.log(error)
        }
    }
    const removeFromCart = (indexToRemove) => {
        setCart(prev => prev.filter((_, i) => i !== indexToRemove));
    }

    const openCart = () => {
        setcartVisibility((!cartVisibility));
    }
    return (
        <CartContext.Provider value={{ user, cart, addToCart, removeFromCart, cartVisibility, openCart }}>
            {children}
        </CartContext.Provider>
    )
}