import { Grid, Typography, Button, Box, Badge } from "@mui/material";
import { Home, Search, ShoppingCart } from "@mui/icons-material";
import { useState } from "react";
import ProductsList from '../components/productsList'
import Cart from "../components/cart";

const Products = () => {
    const [cartCount, setCartCount] = useState(0);
    const [cart, setCart] = useState([])
    const [cartVisibility, setcartVisibility] = useState(false)

    const addToCart = (item) => {
        setCart((prevItem) => {
            const addItem = [...prevItem, item]
            setCartCount(addItem.length)
            return addItem
        })
    }

    const openCart = () => {
        setcartVisibility(!cartVisibility)
    }
    return (
        <Box sx={{ width: '100%', overflowX: 'hidden' }}>
            <Box
                border="2px solid blue"
                padding={2}
                width="100%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ boxSizing: 'border-box' }}
            >
                <Typography variant="h6"> E-Commerce</Typography>
                <Box display="flex" gap={2}>
                    <Button variant="text" startIcon={<Home />}>Home</Button>
                    <Button variant="text" startIcon={<Search />}>Search</Button>
                    <Button variant="text" startIcon={<Badge badgeContent={cartCount} color="secondary"><ShoppingCart /></Badge>}
                        onClick={() => { openCart() }}>Cart</Button>
                </Box>
            </Box>
            <Box
                style={{ display: cartVisibility ? 'block' : 'none', }}
                display={cartVisibility}>
                <Cart cart={cart} />
            </Box>
            <Grid container spacing={3} padding={3} sx={{ width: '100%' }}>
                <ProductsList addToCart={addToCart} />
            </Grid>
        </Box >

    );
}

export default Products;