import { Box, Typography, IconButton, Divider, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart, updateCart } = useContext(CartContext)
    const [totalprice, setTotalPrice] = useState(0);
    useEffect(() => {
        const total = cart.reduce((acc, item) => {
            return acc + item.product.price * item.quantity;
        }, 0);

        setTotalPrice(total);
    }, [cart]);
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
                        <Box
                            key={index}
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            p={2}
                            mb={1}
                            borderRadius={2}
                            sx={{
                                backgroundColor: '#f9f9f9',
                                '&:hover': { backgroundColor: '#e3f2fd' }
                            }}
                        >
                            <Box flex={1}>
                                <Typography variant="subtitle1" fontWeight="600">
                                    {item.product.name}
                                </Typography>
                                <Box display="flex" alignItems="center" mt={1} gap={1}>
                                    <IconButton
                                        onClick={() => updateCart(item.product._id, item.quantity - 1)}
                                        size="small"
                                    >
                                        −
                                    </IconButton>
                                    <Box px={2} py={0.5} borderRadius={1} bgcolor="#1976d2" color="#fff">
                                        {item.quantity}
                                    </Box>
                                    <IconButton
                                        onClick={() => updateCart(item.product._id, item.quantity + 1)}
                                        size="small"
                                    >
                                        +
                                    </IconButton>
                                </Box>
                            </Box>

                            <Box display="flex" flexDirection="column" alignItems="flex-end">
                                <Typography variant="subtitle1" fontWeight="500">
                                    ${item.product.price * item.quantity}
                                </Typography>
                                <IconButton
                                    color="error"
                                    onClick={() => removeFromCart(item.product._id)}
                                    size="small"
                                    sx={{ mt: 1 }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
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
