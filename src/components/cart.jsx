import { Box, Typography, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart } = useContext(CartContext)
    const [totalprice, setTotalPrice] = useState(0);
    return (
        <Box
            boxShadow={5}
            border="1px solid #1976d2"
            display="flex"
            flexDirection="column"
            gap={2}
            p={3}
            position="absolute"
            right="1%"
            width="300px"
            height="70%"
            zIndex={100}
            sx={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                overflow: 'hidden',
            }}
        >
            <Typography variant="h5" fontWeight="bold" color="primary">🛒 Your Cart</Typography>
            <Box
                flex={1}
                overflow="auto"
                display="flex"
                flexDirection="column"
                gap={2}
                sx={{
                    scrollbarWidth: 'thin',
                    scrollBehavior: 'smooth',
                    pr: 1
                }}
            >
                {cart.length > 0 ? (
                    cart.map((item, index) => (
                        <Box key={index} display="flex" justifyContent="space-between" alignItems="center" p={1} borderRadius={1} sx={{ backgroundColor: '#f9f9f9', '&:hover': { backgroundColor: '#e3f2fd' } }}>
                            <Box>
                                <Typography variant="subtitle1" fontWeight="500">
                                    {item.product.name}
                                    <Box component="span" ml={1} px={1} py={0.2} borderRadius={1} bgcolor="#1976d2" color="#fff" fontSize="0.75rem">
                                        x{item.quantity}
                                    </Box>
                                </Typography>
                                <Typography variant="body2" color="textSecondary">${item.product.price}</Typography>
                            </Box>
                            <IconButton color="error" onClick={() => removeFromCart(item.product._id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))
                ) : (
                    <Typography variant="body2" color="textSecondary">Your cart is empty.</Typography>
                )}
            </Box>
            <Divider />
            <Box mt="auto" p={1} bgcolor="#fafafa" borderRadius={2} boxShadow={1}>
                <Typography variant="subtitle1" fontWeight="bold">Total: ${totalprice.toFixed(2)}</Typography>
                <button className='btn btn-outline-primary w-100' style={{ marginTop: '.5rem', padding: '.6rem', borderRadius: '8px' }}>
                    Pay Now
                </button>
            </Box>
        </Box>
    );
};

export default Cart;
