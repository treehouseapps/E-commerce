import React, { createContext, useState } from 'react';

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([])
    const [cartVisibility, setcartVisibility] = useState(false)


    const addToCart = (item) => {
        console.log(item._id)
        setCart((prevItem) => {
            const addItem = [...prevItem, item]
            return addItem
        })
        const token = localStorage.getItem('token')
        const response = fetch('http://localhost:3000/cart/add', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId: item._id, quantity: 1 })
        })
    }
    const removeFromCart = (indexToRemove) => {
        setCart(prev => prev.filter((_, i) => i !== indexToRemove));
    }

    const openCart = () => {
        setcartVisibility(!cartVisibility)
    }
    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartVisibility, openCart }}>
            {children}
        </CartContext.Provider>
    )
}