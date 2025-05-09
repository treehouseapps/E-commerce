import { Box, Typography, IconButton, Divider, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import Button from '../components/Button'
const link = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
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
            <Typography variant="h5" fontWeight="bold" color="#ff1e00" fontFamily={'Quicksand'}>🛒 Your Cart</Typography>
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
                                <Typography variant="subtitle1" fontWeight="600" fontFamily={'Quicksand'}>
                                    {item.product.name}
                                </Typography>
                                <Box display="flex" alignItems="center" mt={1} gap={1}>
                                    <IconButton
                                        onClick={() => updateCart(item.product._id, item.quantity - 1)}
                                        size="small"
                                    >
                                        −
                                    </IconButton>
                                    <Box px={2} py={0.5} borderRadius={1} border="2px solid #333" color="black">
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
                                    ${(item.product.price * item.quantity).toFixed(2)}
                                </Typography>
                                <IconButton
                                    color="error"
                                    onClick={() => removeFromCart(item.product._id)}
                                    size="small"
                                    sx={{ mt: 1, color: 'ff1e00', backgroundColor: 'ff1e00' }}
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
                <Typography variant="subtitle1" fontWeight="bold" fontFamily={'Quicksand'}>Total: ${totalprice.toFixed(2)}</Typography>
                <Button onClick={() => window.location.href = link}
                    sx={{
                        marginTop: '.5rem',
                        padding: '.6rem',
                    }} text='Check Out' />
            </Box>
        </Box>
    );
};

export default Cart;
