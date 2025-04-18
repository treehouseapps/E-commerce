import { Home, Search, ShoppingCart } from "@mui/icons-material";
import { Typography, Button, Box, Badge } from "@mui/material";
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import Cart from "../components/cart";

const Navbar = () => {
    const { cart, cartVisibility, openCart } = useContext(CartContext)
    return (
        <>
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
                    <Button variant="text" startIcon={<Badge badgeContent={cart.length} color="secondary"><ShoppingCart /></Badge>}
                        onClick={() => { openCart() }}>Cart</Button>
                </Box>
            </Box>
            <Box
                style={{ display: cartVisibility ? 'block' : 'none', }}
                display={cartVisibility}>
                <Cart />
            </Box></>
    );
}

export default Navbar;