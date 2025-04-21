import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([])
    const [cartVisibility, setcartVisibility] = useState(false)

    const getItem = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:3000/cart/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const cartItem = await response.json()
        setCart(cartItem.products)
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
            alert(result.message)
        } catch (error) {
            console.log(error)
        }
    }
    const removeFromCart = (indexToRemove) => {
        setCart(prev => prev.filter((_, i) => i !== indexToRemove));
    }

    const openCart = () => {
        const newVisibility = !cartVisibility;
        setcartVisibility(newVisibility);

        if (!cartVisibility) {
            getItem();
        }
    }
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartVisibility, openCart }}>
            {children}
        </CartContext.Provider>
    )
}