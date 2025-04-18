import React, { createContext, useState } from 'react';

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([])
    const [cartVisibility, setcartVisibility] = useState(false)


    const addToCart = (item) => {
        setCart((prevItem) => {
            const addItem = [...prevItem, item]
            return addItem
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