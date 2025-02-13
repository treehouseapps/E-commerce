import { Box, Button, Typography, Grid, Badge } from "@mui/material";
import { Home, Search, ShoppingCart } from "@mui/icons-material";
import { useEffect, useState } from "react";

const App = () => {
    const [cartCount, setCartCount] = useState(0);
    const [cart, setCart] = useState([])
    const arr = [
        { id: 1, name: 'Pizza', img: 'pizza.jpg', price: '$10' },
        { id: 2, name: 'Burger', img: 'burger.jpg', price: '$8' },
        { id: 3, name: 'Pasta', img: 'pasta.jpg', price: '$12' },
        { id: 4, name: 'Salad', img: 'salad.jpg', price: '$7' },
        { id: 5, name: 'Steak', img: 'steak.jpg', price: '$15' },
        { id: 6, name: 'Ice Cream', img: 'ice-cream.jpg', price: '$5' }
    ];

    const addToCart = (item) => {
        setCart((prevItem) => {
            const addItem = [...prevItem, item]
            setCartCount(addItem.length)
            return addItem
        })
    }
    useEffect(() => {
        console.log(cart)
    }, [cart])

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
                <Typography variant="h6">Food E-Commerce</Typography>
                <Box display="flex" gap={2}>
                    <Button variant="text" startIcon={<Home />}>Home</Button>
                    <Button variant="text" startIcon={<Search />}>Search</Button>
                    <Button variant="text" startIcon={<Badge badgeContent={cartCount} color="secondary"><ShoppingCart /></Badge>}>Cart</Button>
                </Box>
            </Box>

            <Grid container spacing={3} padding={3} sx={{ width: '100%' }}>
                {arr.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Box
                            border="1px solid #ccc"
                            padding={2}
                            textAlign="center"
                            borderRadius="8px"
                            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
                            sx={{ width: '100%' }}
                        >
                            <Box>
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    style={{ width: '100%', borderRadius: '8px' }}
                                />
                            </Box>
                            <Typography variant="h6" mt={2}>{item.name}</Typography>
                            <Typography variant="body2" color="textSecondary">{item.price}</Typography>
                            <Button
                                variant="contained"
                                sx={{ mt: 2 }}
                                fullWidth
                                onClick={() => { addToCart(item) }}
                            >
                                Add To Cart
                            </Button>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Box
                border="1px solid #1976d2"
                display="flex"
                flexDirection="column"
                gap={2}
                p={3}
                width="95%"
                height="auto"
                sx={{ backgroundColor: '#f1f1f1', borderRadius: '8px', marginTop: '10px' }}
            >
                <Typography variant="h5" fontWeight="bold">Your Cart</Typography>
                <Box display='inline-flex' gap={2}>    {cart.length > 0 ? (
                    cart.map((item, index) => (
                        <Box key={index} display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6">{item.name}</Typography>
                            <Typography variant="body2" color="textSecondary">{item.price}</Typography>
                        </Box>
                    ))
                ) : (
                    <Typography variant="body2" color="textSecondary">Your cart is empty.</Typography>
                )}</Box>
            </Box>
        </Box >
    );
};

export default App;
